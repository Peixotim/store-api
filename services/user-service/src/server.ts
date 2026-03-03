import 'dotenv/config';
import express from 'express';
import sequelize from './config/sequelize';
import { runMigrations } from './database/migrate';

const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from user-service!');
});

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
