import express from 'express';
import { registerValidation } from '../validation/registerValidation.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerValidation, userController.register);
router.post('/login', userController.login);

export default router;
