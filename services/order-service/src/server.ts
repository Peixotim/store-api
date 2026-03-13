import 'dotenv/config';
import express from 'express';
import router from './routes/order-routes';
import sequelize from './config/squelize';
import { runMigrations } from './database/migrate';
import { RabbitMQService } from './routes/services/rabbitmq-service';

const app = express();
const port = process.env.PORT || 3004;
const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';
const rabbitMqService = new RabbitMQService(amqpUrl);

app.use(express.json());
app.use('', router);

async function bootStrap() {
  try {
    await sequelize.authenticate();
    await runMigrations();
    await rabbitMqService.start();

    app.listen(port, () => {
      console.log(`Microservice Order is running !`);
    });
  } catch (error) {
    console.error(`Error is ${error}`);
    process.exit(1);
  }
}

bootStrap();
