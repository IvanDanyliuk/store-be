import mongoose, { Schema } from 'mongoose';
import { IUser } from 'types';


const userSchema: Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  city: String,
  avatarUrl: String,
  wishList: [],
  orders: [],
  isAdmin: Boolean,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let User = mongoose.model<IUser>('User', userSchema);

export default User;