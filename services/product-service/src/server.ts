import 'dotenv/config';
import express from 'express';
import router from './routes/product-routes';
import sequelize from './config/sequelize';
import { runMigrations } from './database/migrate';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use('', router)
app.get('/', (req, res) => {
  res.send('Hello from product-service!');
});

async function bootStrap(){
  try{
    await sequelize.authenticate();
    await runMigrations();
app.listen(port, () => {
  console.log(`product-service listening at http://localhost:${port}`);
});
  }catch(error){
    console.error(`Error is ${error}`);
    process.exit(1);
  }
}

