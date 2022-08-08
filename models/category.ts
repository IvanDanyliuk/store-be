import mongoose, { Schema } from "mongoose";
import { ICategory } from "types";


const categorySchema: Schema = new mongoose.Schema({
  id: String,
  title: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

let Category = mongoose.model<ICategory>('Categories', categorySchema);

export default Category;