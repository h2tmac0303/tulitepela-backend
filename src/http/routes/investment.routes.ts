import { Router } from 'express';
import { InvestmentController } from '../controllers/InvestmentController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
const investmentRoutes = Router();
const investmentController = new InvestmentController();

// PRIVADO (Investidor): Realizar investimento e ver seu histórico
investmentRoutes.post('/contribute', authMiddleware, roleMiddleware(['INVESTOR']), investmentController.handleContribute);
investmentRoutes.get('/my-investments', authMiddleware, roleMiddleware(['INVESTOR']), investmentController.handleListByInvestor);

export { investmentRoutes };