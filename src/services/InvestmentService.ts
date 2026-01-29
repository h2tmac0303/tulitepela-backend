import { prisma } from "../config/database.js";

export class InvestmentService {
  // O Investidor apenas cria a intenção (PENDING)
  async contribute(investorId: string, cropId: string, amount: number, proofUrl?: string) {
    const crop = await prisma.crop.findUnique({ where: { id: cropId } });
    if (!crop || crop.status !== 'OPEN') throw new Error("CROP_NOT_AVAILABLE");

    return await prisma.investment.create({
      data: { 
        investorId, 
        cropId, 
        amount, 
        status: 'PENDING', // Sempre começa pendente no MVP
        proofUrl : proofUrl ?? null
      }
    });
  }

  // O ADMIN chama esta função após conferir o extrato bancário
  async confirmInvestment(investmentId: string) {
    return await prisma.$transaction(async (tx) => {
      const investment = await tx.investment.findUnique({
        where: { id: investmentId },
        include: { crop: true }
      });

      if (!investment || investment.status !== 'PENDING') {
        throw new Error("INVESTMENT_NOT_ELIGIBLE");
      }

      // 1. Confirma o Investimento
      const updatedInvestment = await tx.investment.update({
        where: { id: investmentId },
        data: { status: 'CONFIRMED' }
      });

      // 2. Só agora o valor sobe na Safra
      await tx.crop.update({
        where: { id: investment.cropId },
        data: { raisedAmount: { increment: investment.amount } }
      });

      return updatedInvestment;
    });
  }

  async listByInvestor(investorId: string) {
    return await prisma.investment.findMany({
      where: { investorId },
      include: {
        crop: {
          select: { 
            title: true, 
            status: true, 
            expectedReturn: true,
            culture: true,   // Adicionado para bater com seu novo schema
            farmName: true 
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}