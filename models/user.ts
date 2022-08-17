import mongoose, { Schema } from 'mongoose';
import { IUser } from 'types';
import Product from './product';


const userSchema: Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  city: String,
  language: String,
  avatarUrl: String,
  orders: [{
    product: Product,
    date: Date,
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let User = mongoose.model<IUser>('User', userSchema);

export default User;