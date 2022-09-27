import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import productsRoute from './routes/products';
import categoriesRoute from './routes/categories';
import shippingRoute from './routes/shipping';
import userRoute from './routes/users';
import ordersRoute from './routes/orders';
import bodyParser from 'body-parser';

import Stripe from 'stripe';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const stripe = new Stripe(
  process.env.SECRET_KEY!, 
  { apiVersion: '2022-08-01', typescript: true }
);

app.use(cors());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb' }));

app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);
app.use('/shipping', shippingRoute);
app.use('/user', userRoute);
app.use('/orders', ordersRoute);

mongoose.connect(process.env.CONNECTION_URL!)
  .then(() => app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));