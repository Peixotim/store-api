import express from 'express';
import dotenv from 'dotenv/config';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(errorHandler);


app.listen(port , () => {
  console.log(`Microservice is running in port ${port}`);
})