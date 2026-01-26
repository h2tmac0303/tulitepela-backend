import type { NextFunction, Request, Response } from "express";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Preenchido pelo authMiddleware

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        message: "Acesso negado. Esta função requer perfil: " + allowedRoles.join(', ') 
      });
    }

    return next();
  };
};