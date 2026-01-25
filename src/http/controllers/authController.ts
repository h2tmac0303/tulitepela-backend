import type { Request, Response } from 'express';
import { AuthService } from '../../services/AuthService.js';

const authService = new AuthService();

export class AuthController {
  async handleRegister(req: Request, res: Response) {
    try {
      const result = await authService.registerUser(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      if (error.message === "USER_ALREADY_EXISTS") {
        return res.status(400).json({ message: "Usuário já cadastrado" });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}