import { prisma } from "../config/database.js";

interface CreateCropData {
  title: string;
  description: string;
  culture: string;
  farmName: string;
  location: string;
  cycle: "SHORT" | "MEDIUM" | "LONG";
  expectedReturn: number;
  goalAmount: number;
  estimatedEndDate: string;
  imageUrl?: string;
  farmerId: string;
}
export class CropService {
  async createCrop(data: CreateCropData) {
    return await prisma.crop.create({
      data: {
        ...data,
        goalAmount: Number(data.goalAmount),
        expectedReturn: Number(data.expectedReturn),
        startDate: new Date(),
        estimatedEndDate: new Date(data.estimatedEndDate),
        status: "OPEN",
      },
    });
  }

  async listOpenCrops() {
    return await prisma.crop.findMany({
      where: { status: "OPEN" },
      include: {
        farmer: { select: { name: true, location: true } },
      },
    });
  }

  // src/services/CropService.ts

  async listByFarmer(farmerId: string) {
    return await prisma.crop.findMany({
      where: { farmerId },
      orderBy: { startDate: "desc" },
    });
  }

  async deleteCrop(id: string, farmerId: string) {
    const crop = await prisma.crop.findUnique({ where: { id } });

    if (!crop) throw new Error("Safra não encontrada");
    if (crop.farmerId !== farmerId) throw new Error("Não autorizado");
    if (crop.raisedAmount > 0) throw new Error("Possui investimentos ativos");

    return await prisma.crop.delete({ where: { id } });
  }
}
