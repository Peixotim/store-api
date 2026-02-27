import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send('Hello from product-service!');
});

app.listen(port, () => {
  console.log(`product-service listening at http://localhost:${port}`);
});
