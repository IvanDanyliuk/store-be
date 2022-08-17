import mongoose, { Schema } from "mongoose";
import { IProduct } from "types";
import Category from './category';
import User from './user';


const productSchema: Schema = new mongoose.Schema({
  title: String,
  category: Category,
  description: String,
  price: Number,
  color: String,
  rating: Number,
  mainImageUrl: String,
  imageUrls: [String],
  promotion: [String],
  isInStock: Boolean,
  shortInfo: String,
  reviews: [{
    user: User,
    comment: String,
    likes: Number,
    dislikes: Number,
    date: Date,
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Product = mongoose.model<IProduct>('Products', productSchema);

export default Product;