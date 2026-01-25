// src/config/auth.ts
export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-para-dev', // fallback ou erro
    expiresIn: '7d',
  },
};

// Ou de forma mais rigorosa (Recomendado):
if (!process.env.JWT_SECRET) {
  // Em produção, isso garante que o erro seja pego no log imediatamente
  console.warn("⚠️ JWT_SECRET não definida. Usando segredo inseguro para desenvolvimento.");
}

export const secret = process.env.JWT_SECRET as string; // O "as string" resolve o erro do TS