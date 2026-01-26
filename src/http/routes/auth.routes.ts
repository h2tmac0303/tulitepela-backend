import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', authController.handleRegister);
authRoutes.post('/login', authController.handleLogin);

export { authRoutes };