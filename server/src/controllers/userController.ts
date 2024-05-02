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

const register = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw HttpError(400, 'Bad request');
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userId: uuidv4(),
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const token = jwt.sign(
      {
        id: newUser.dataValues.userId,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = newUser.dataValues;

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
      user.dataValues.passwordHash
    );

    if (!isValidPassword) {
      throw HttpError(404, 'Invalid login or password');
    }

    const token = jwt.sign(
      {
        id: user.dataValues.userId,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );
    const { passwordHash, ...userData } = user.dataValues;

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
    const user = await User.findOne({ where: { userId: req.body.userId } });

    if (!user) {
      throw HttpError(404, 'Not found');
    }

    const { passwordHash, ...userData } = user.dataValues;

    resp.json({ ...userData });
  } catch (error) {
    next(error);
  }
};

export default { register, login, getMe };