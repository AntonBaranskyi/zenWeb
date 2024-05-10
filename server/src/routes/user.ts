import express from 'express';
import { registerValidation } from '../validation/registerValidation.js';
import userController from '../controllers/userController.js';
import checkAuth from '../helpers/checkAuth.js';

const router = express.Router();

router.post('/register', registerValidation, userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.get('/me', checkAuth, userController.getMe);
router.patch('/update-password', userController.updatePassword);

export default router;
