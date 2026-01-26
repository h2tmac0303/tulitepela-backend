import { prisma } from "../config/database.js";

export class CropService {
  async createCrop(data: any) {
    return await prisma.crop.create({
      data: {
        title: data.title,
        description: data.description,
        goalAmount: data.goalAmount,
        expectedReturn: data.expectedReturn,
        cycle: data.cycle,
        farmerId: data.farmerId,
        startDate: new Date(),
        estimatedEndDate: data.estimatedEndDate,
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
}
