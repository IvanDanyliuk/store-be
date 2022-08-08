import mongoose, { Schema } from "mongoose";
import { IProduct } from "types";


const productSchema: Schema = new mongoose.Schema({
  productId: String,
  title: String,
  category: String,
  description: String,
  price: Number,
  rating: Number,
  reviews: [String],
  mainImageUrl: String,
  imageUrls: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Product = mongoose.model<IProduct>('Products', productSchema);

export default Product;