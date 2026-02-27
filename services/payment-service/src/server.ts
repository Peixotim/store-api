import 'dotenv/config';
import express from 'express';
import { Request,Response } from 'express';

const app = express();
const port = process.env.PORT || 3005;

app.get('/health', (req : Request , res : Response) => {
  res.send(`API is Running`);
});


app.listen(port, () => {
  console.log(`payment-service listening at http://localhost:${port}`);
});
