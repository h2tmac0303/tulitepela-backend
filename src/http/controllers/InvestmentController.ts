import type { Request, Response } from "express";
import { InvestmentService } from "../../services/InvestmentService.js";

const investmentService = new InvestmentService();

export class InvestmentController {
  async handleContribute(req: Request, res: Response) {
    const { cropId, amount } = req.body;
    const investorId = req.user.id;

    try {
      const result = await investmentService.contribute(investorId, cropId, amount);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async handleListByInvestor(req: Request, res: Response) {
  try {
    const investorId = req.user.id;
    const investments = await investmentService.listByInvestor(investorId);
    return res.status(200).json(investments);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar seus investimentos." });
  }
}
}