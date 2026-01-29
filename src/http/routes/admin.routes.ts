import { AdminInvestmentController } from "../controllers/AdminInvestmentController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import express from "express";
// Supondo que você tenha um isAdminMiddleware
// import { isAdminMiddleware } from "./middlewares/isAdmin.js";

const adminController = new AdminInvestmentController();
const router = express()
// Painel Administrativo de Investimentos
router.get("/admin/investments/pending", authMiddleware, adminController.listPending);
router.patch("/admin/investments/:id/confirm", authMiddleware, adminController.handleConfirm);
router.patch("/admin/investments/:id/reject", authMiddleware, adminController.handleReject);