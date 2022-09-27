import mongoose, { Schema } from 'mongoose';
import productSchema from './product';
import userSchema from './user';
import { IOrder } from '../types';


const orderSchema: Schema = new mongoose.Schema({
  products: [productSchema],
  user: userSchema,
  isPaid: Boolean,
  isShipped: Boolean,
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;