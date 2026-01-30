import type { Request, Response } from "express";
import { InvestmentService } from "../../services/InvestmentService.js";

// Instanciamos o serviço aqui
const investmentService = new InvestmentService();

export class AdminInvestmentController {
  async listPending(req: Request, res: Response) {
    try {
      // Usamos a instância 'investmentService' em minúsculo
      const data = await investmentService.listAllPending();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar pendentes" });
    }
  }

  async handleConfirm(req: Request, res: Response) {
    try {
      const result = await investmentService.confirmInvestment(req.params.id as string);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleReject(req: Request, res: Response) {
    try {
      await investmentService.rejectInvestment(req.params.id as string);
      return res.status(200).json({ message: "Sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}