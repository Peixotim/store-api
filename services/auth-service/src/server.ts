import express from 'express';
import dotenv from 'dotenv/config';
import { errorHandler } from './middlewares/error-handler';
import { Request, Response } from 'express';
import { authRouter } from './routers/auth-router';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(errorHandler);
app.use('/auth',authRouter);

app.get('/health', (req : Request , res : Response) => {
  res.send(`API is Running`);
});


app.listen(port , () => {
  console.log(`Microservice is running in port ${port}`);
})