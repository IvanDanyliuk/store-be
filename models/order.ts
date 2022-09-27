import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types';


const orderSchema: Schema = new mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
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