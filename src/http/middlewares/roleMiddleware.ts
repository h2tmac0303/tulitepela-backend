import type { NextFunction, Request, Response } from "express";

export const roleMiddleware = (allowedRoles: ('INVESTOR' | 'FARMER' | 'ADMIN')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        message: "Permissão insuficiente para acessar este recurso." 
      });
    }

    return next();
  };
};