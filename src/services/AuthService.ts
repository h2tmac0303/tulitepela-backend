import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';

export class AuthService {
  async registerUser(data: any) {
    const { email, password, name, role, document, location } = data;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("USER_ALREADY_EXISTS");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash, role, document, location }
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

async loginUser({ email, password }: any) {
  // 1. Busca o usuário pelo e-mail
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("INVALID_CREDENTIALS");

  // 2. Compara a senha enviada com o hash salvo no banco
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error("INVALID_CREDENTIALS");

  // 3. Gera o Token JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  const { passwordHash: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}
}