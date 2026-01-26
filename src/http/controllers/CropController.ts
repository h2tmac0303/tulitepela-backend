import type { Request, Response } from 'express';
import { CropService } from '../../services/CropService.js';

const cropService = new CropService();

export class CropController {
  async handleCreate(req: Request, res: Response) {
    try {
      const crop = await cropService.createCrop({
        ...req.body,
        farmerId: req.user.id // Pegue do Token via Middleware
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
}