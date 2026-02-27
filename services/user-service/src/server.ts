import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from user-service!');
});

app.listen(port, () => {
  console.log(`user-service listening at http://localhost:${port}`);
});
