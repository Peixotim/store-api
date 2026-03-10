import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';

const router: Router = Router();
const controller = new OrderController();

router.get('/health', controller.health.bind(controller));

export default router;
