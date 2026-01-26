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
}