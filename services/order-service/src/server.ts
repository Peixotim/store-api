import 'dotenv/config';
import express from 'express';
import router from './routes/order-routes';
import sequelize from './config/squelize';
import { runMigrations } from './database/migrate';

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());
app.use('', router);

async function bootStrap() {
  try {
    await sequelize.authenticate();
    await runMigrations();
    app.listen(port, () => {
      console.log(`Microservice Order is running !`);
    });
  } catch (error) {
    console.error(`Error is ${error}`);
    process.exit(1);
  }
}

bootStrap();
