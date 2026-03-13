import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';
import { OrderService } from '../services/order-service';
import { ProductRepository } from '../repositories/product-repository';
import { OrderRepository, OrderItemsRepository } from '../repositories/order-repository';
import { RabbitMQService } from '../services/rabbitmq-service';

const router: Router = Router();

const uri: string = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';

const productRepo = new ProductRepository();
const orderRepo = new OrderRepository();
const orderItemRepo = new OrderItemsRepository();
const rabbitMqService = new RabbitMQService(uri);

const orderService = new OrderService(productRepo, orderRepo, orderItemRepo, rabbitMqService);

const controller = new OrderController(orderService);

router.get('/health', controller.health.bind(controller));

router.post('/orders', controller.createOrder.bind(controller));

router.get('/orders/:id', controller.getOrderById.bind(controller));

router.patch('/orders/:id/status', controller.updateOrderStatus.bind(controller));

export default router;
