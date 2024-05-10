import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNext,
} from 'express';

import { validationResult } from 'express-validator';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer/index.js';

const register = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  try {
    const errors = validationResult(req);
    const email = req.body.email;

    const isUserExist = await User.findOne({ where: { email } });

    if (isUserExist) {
      throw HttpError(400, 'User already exist');
    }

    if (!errors.isEmpty()) {
      throw HttpError(400, 'Bad request');
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      user_id: uuidv4(),
      email,
      full_name: req.body.full_name,
      password_hash: hash,
    });

    const token = jwt.sign(
      {
        id: newUser.dataValues.user_id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { password_hash, ...userData } = newUser.dataValues;

    resp.json({ ...userData, token });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      throw HttpError(404, 'Not found');
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password_hash
    );

    if (!isValidPassword) {
      throw HttpError(404, 'Invalid login or password');
    }

    const token = jwt.sign(
      {
        id: user.dataValues.user_id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );
    const { password_hash, ...userData } = user.dataValues;

    resp.json({ ...userData, token });
  } catch (error) {
    next(error);
  }
};

const getMe = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  try {
    const user = await User.findOne({ where: { user_id: req.body.user_id } });

    if (!user) {
      throw HttpError(404, 'Not found');
    }

    const { password_hash, ...userData } = user.dataValues;

    resp.json({ ...userData });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw HttpError(404, 'User does not exist');
    }

    const token = jwt.sign({ id: user.dataValues.user_id }, 'secret123', {
      expiresIn: '15m',
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net',
      port: 2525,
      secure: true,

      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await User.update(
      { resetLink: token },
      {
        where: {
          email,
        },
      }
    );

    transporter
      .sendMail({
        from: 'antontest03@ukr.net',
        to: email,
        subject: 'Hello world',
        html: `
         <h3>Please click a link below to reset your password</h3>
         <p>${process.env.CLIENT_URL}/auth/reset-password/${token}</p>
         `,
      })
      .then(() => {
        return resp.json({ message: 'Email sent' });
      })
      .catch((err) => {
        return HttpError(400, 'Can`t send email ' + err);
      });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  const { password, token } = req.body;

  try {
    if (token) {
      //@ts-ignore
      jwt.verify(token, 'secret123', (err, decodedData) => {
        if (err) {
          return HttpError(400, 'Incorrect tokenor its expired');
        }
      });

      const updatedUser = await User.findOne({ where: { resetLink: token } });

      if (!updatedUser) {
        throw HttpError(400, 'User with this token does not exist');
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      console.log(updatedUser);

      await User.update(
        { password_hash: hash },
        {
          where: {
            user_id: updatedUser.dataValues.user_id,
          },
        }
      );

      resp.json({ message: 'Password updated' });
    } else {
      return HttpError(401, 'Authentication error');
    }
  } catch (error) {
    next(error);
  }
};

export default { register, login, getMe, forgotPassword, updatePassword };
