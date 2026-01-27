import { Router } from 'express';
import { CropController } from '../controllers/CropController.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const cropRoutes = Router();
const cropController = new CropController();

// PÚBLICO: Ver oportunidades na Landing Page
cropRoutes.get('/open', cropController.handleListOpen);

// PRIVADO (Agricultor): Criar e gerenciar suas próprias safras
cropRoutes.post('/', authMiddleware, roleMiddleware(['FARMER']), cropController.handleCreate);
cropRoutes.get('/my-crops', authMiddleware, roleMiddleware(['FARMER']), cropController.handleListByFarmer);
cropRoutes.delete('/:id', authMiddleware, roleMiddleware(['FARMER']), cropController.handleDelete);

export { cropRoutes };