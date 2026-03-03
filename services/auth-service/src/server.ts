import express from 'express';
import dotenv from 'dotenv/config';
import { errorHandler } from './middlewares/error-handler';
import { Request, Response } from 'express';
import { authRouter } from './routers/auth-router';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(errorHandler);
app.use(authRouter);




app.listen(port , () => {
  console.log(`Microservice is running in port ${port}`);
})