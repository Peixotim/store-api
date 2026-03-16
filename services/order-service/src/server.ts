import 'dotenv/config';
import express from 'express';
import sequelize from './config/squelize';
import { runMigrations } from './database/migrate';
import { RabbitMQService } from './services/rabbitmq-service';
import { OrderService } from './services/order-service';
import { OrderController } from './controllers/order-controller';
import router from './routes/order-routes';
import { ProductRepository } from './repositories/product-repository';
import { OrderRepository, OrderItemsRepository } from './repositories/order-repository';

const app = express();
const port = process.env.PORT || 3004;

const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';
const rabbitMqService = new RabbitMQService(amqpUrl);

const productRepo = new ProductRepository();
const orderRepo = new OrderRepository();
const orderItemRepo = new OrderItemsRepository();

const orderService = new OrderService(productRepo, orderRepo, orderItemRepo, rabbitMqService);

app.use(express.json());
app.use('', router);

async function bootStrap() {
  try {
    await sequelize.authenticate();
    await runMigrations();
    await rabbitMqService.start();

    await rabbitMqService.consume('payment_finished', async (message: any) => {
      await orderService.updatedOrderStatus(message.order_id, message.status);
    });

    app.listen(port, () => {
      console.log(`Microservice Order is running on port ${port}!`);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

bootStrap();
