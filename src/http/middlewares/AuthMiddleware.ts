import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: "INVESTOR" | "FARMER" | "ADMIN";
}

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("Ambiente não configurado: JWT_SECRET ausente.");
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token ausente" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token!, secret) as unknown as TokenPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};
