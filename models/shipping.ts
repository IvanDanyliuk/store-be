import mongoose, { Schema } from "mongoose";
import { IShipping } from "types";


const shippingSchema: Schema = new mongoose.Schema({
  main: {
    title: String,
    url: String,
  },
  subCategories: [{
    title: String,
    url: String,
  }]
});

let Shipping = mongoose.model<IShipping>('Shipping', shippingSchema);

export default Shipping;