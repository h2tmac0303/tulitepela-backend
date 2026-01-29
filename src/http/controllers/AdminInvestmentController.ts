import type { Request, Response } from "express";
import { InvestmentService } from "../../services/InvestmentService.js";
import { prisma } from "../../config/database.js";

const investmentService = new InvestmentService();

export class AdminInvestmentController {
  // Lista todos os investimentos que aguardam validação
  async listPending(req: Request, res: Response) {
    try {
      const pendingInvestments = await prisma.investment.findMany({
        where: { status: "PENDING" },
        include: {
          investor: { select: { name: true, email: true } },
          crop: { select: { culture: true, farmName: true } }
        },
        orderBy: { createdAt: "desc" }
      });

      return res.status(200).json(pendingInvestments);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar investimentos pendentes." });
    }
  }

  // Aprova o investimento e atualiza a Safra atomicamente
  async handleConfirm(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const confirmed = await investmentService.confirmInvestment(id as string);
      return res.status(200).json({
        message: "Investimento confirmado com sucesso!",
        data: confirmed
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Rejeita o investimento (ex: comprovativo falso ou valor errado)
  async handleReject(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.investment.update({
        where: { id: id as string },
        data: { status: "REJECTED" }
      });
      return res.status(200).json({ message: "Investimento rejeitado." });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao rejeitar investimento." });
    }
  }
}