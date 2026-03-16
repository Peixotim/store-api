import 'dotenv/config';
import express from 'express';
import setupRouter from './routes/route';
import { RabbitMQService } from './services/rabbitmq-service';
import { PaymentService } from './services/payment-service';
import { PaymentController } from './controllers/payment-controller';
import sequelize from './config/sequelize';

const app = express();
const port = process.env.PORT || 3005;

const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';
const rabbitMQ = new RabbitMQService(amqpUrl);
const paymentService = new PaymentService(rabbitMQ);
const paymentController = new PaymentController(paymentService);

app.use(express.json());

app.use('', setupRouter(paymentController));

async function bootStrap() {
  try {
    await sequelize.authenticate();
    await rabbitMQ.start();
    await rabbitMQ.consume('order_created', async (message: any) => {
      console.log('Request received for processing:', message.order_id);
      await paymentService.processPayment(message);
    });

    app.listen(port, () => {
      console.log(`Payment Service running on the door ${port}`);
    });
  } catch (error) {
    console.error(`Bootstrap error: ${error}`);
    process.exit(1);
  }
}

bootStrap();
