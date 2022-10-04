import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types';


const orderSchema: Schema = new mongoose.Schema({
  products: [{
    id: String,
    quantity: Number,
    product: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Products',
    },
  }],
  amount: Number,
  customer: {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
  },
  recepient: {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
  },
  isPaid: Boolean,
  isShipped: Boolean,
  shippingCity: String,
  shippingCompany: String,
  paymentMethod: String,
  creditCardNumber: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;