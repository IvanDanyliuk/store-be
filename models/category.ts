import mongoose, { Schema } from "mongoose";
import { ICategory } from "types";


const categorySchema: Schema = new mongoose.Schema({
  main: {
    title: String,
    url: String,
  },
  subCategories: [{
    title: String,
    url: String,
  }]
});

let Category = mongoose.model<ICategory>('Categories', categorySchema);

export default Category;