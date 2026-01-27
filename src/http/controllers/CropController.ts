import type { Request, Response } from "express";
import { CropService } from "../../services/CropService.js";
import { prisma } from "../../config/database.js";

const cropService = new CropService();

export class CropController {
  async handleCreate(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        cycle,
        expectedReturn,
        goalAmount,
        estimatedEndDate,
      } = req.body;

      const crop = await prisma.crop.create({
        data: {
          ...req.body,
          goalAmount: Number(req.body.goalAmount),
          expectedReturn: Number(req.body.expectedReturn),
          startDate: new Date(), // Resolve a obrigatoriedade do campo no seu Schema
          estimatedEndDate: new Date(req.body.estimatedEndDate),
          farmerId: req.user.id,
        },
      });
      return res.status(201).json(crop);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar safra" });
    }
  }

  async handleListOpen(req: Request, res: Response) {
    const crops = await cropService.listOpenCrops();
    return res.status(200).json(crops);
  }

  async handleListByFarmer(req: Request, res: Response) {
    try {
      const farmerId = req.user.id; // ID extraído do token pelo authMiddleware
      const crops = await cropService.listByFarmer(farmerId);
      return res.status(200).json(crops);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar suas safras." });
    }
  }

async handleDelete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const farmerId = req.user.id;

      await cropService.deleteCrop(id, farmerId);
      return res.status(204).send();
    } catch (error: any) {
      const status = error.message === "Não autorizado" ? 403 : 400;
      return res.status(status).json({ message: error.message });
    }
  }
}
