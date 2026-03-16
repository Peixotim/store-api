import { Router } from 'express';
import { PaymentController } from '../controllers/payment-controller';

export default function setupRouter(controller: PaymentController): Router {
  const router: Router = Router();

  router.get('/health', controller.health.bind(controller));

  return router;
}
