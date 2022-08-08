import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import productsRoute from './routes/products';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/products', productsRoute);
// app.use('/categories', categoriesRoute);
// app.use('/products', usersRoute);

mongoose.connect(process.env.MONGODB_URL || '')
  .then(() => app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));