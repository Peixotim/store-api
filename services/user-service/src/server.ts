import 'dotenv/config';
import express from 'express';
import sequelize from './config/sequelize';
import { runMigrations } from './database/migrate';
import { errorMiddleware } from './middlewares/error-middleware';
import router from './routers/user-routes';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

async function bootstrap(): Promise<void> {
  try {
    await sequelize.authenticate();
    await runMigrations();

    app.listen(port, () => {
      console.log(`user-service listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error is ${error}`);
    process.exit(1);
  }
}

bootstrap();
