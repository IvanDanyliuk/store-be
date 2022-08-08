import mongoose, { Schema } from 'mongoose';
import { IUser } from 'types';
import Product from './product';


const userSchema: Schema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  imageUrl: String,
  orderList: [Product],
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let User = mongoose.model<IUser>('User', userSchema);

export default User;