import { prisma } from "../config/database.js";

export class InvestmentService {
  async contribute(investorId: string, cropId: string, amount: number) {
    return await prisma.$transaction(async (tx) => {
      // 1. Verificar se a safra existe e está aberta
      const crop = await tx.crop.findUnique({ where: { id: cropId } });
      if (!crop || crop.status !== 'OPEN') throw new Error("CROP_NOT_AVAILABLE");

      // 2. Criar o registro de investimento
      const investment = await tx.investment.create({
        data: { investorId, cropId, amount, status: 'CONFIRMED' }
      });

      // 3. Atualizar o valor arrecadado na Safra
      await tx.crop.update({
        where: { id: cropId },
        data: { raisedAmount: { increment: amount } }
      });

      return investment;
    });
  }
}