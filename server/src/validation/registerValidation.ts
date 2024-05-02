import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Wrong format of email').isEmail(),
  body('password', 'Password should contain more than 4 symbols').isLength({
    min: 4,
  }),
  body('full_name', 'Plese write your name').isLength({ min: 3 }),
];
