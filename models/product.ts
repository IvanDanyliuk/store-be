import mongoose from "mongoose";
import { IProduct } from "types";


const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  category: {
    main: {
      title: String,
      url: String,
    },
    subCategory: {
      title: String,
      url: String,
    },
  },
  description: String,
  price: Number,
  color: String,
  rating: Number,
  image: String,
  promotion: [String],
  isInStock: Boolean,
  shortInfo: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Product = mongoose.model<IProduct>('Products', productSchema);

export default Product;