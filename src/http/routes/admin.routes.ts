import { AdminInvestmentController } from "../controllers/AdminInvestmentController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import express from "express";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const adminController = new AdminInvestmentController();
const adminRoutes = express()
// Painel Administrativo de Investimentos
adminRoutes.get("/admin/investments/pending", authMiddleware, roleMiddleware(['ADMIN']), adminController.listPending);
adminRoutes.patch("/admin/investments/:id/confirm", authMiddleware, roleMiddleware(['ADMIN']), adminController.handleConfirm);
adminRoutes.patch("/admin/investments/:id/reject", authMiddleware, roleMiddleware(['ADMIN']), adminController.handleReject);

export { adminRoutes };