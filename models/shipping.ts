import mongoose, { Schema } from "mongoose";
import { IShipping } from "types";


const shippingSchema: Schema = new mongoose.Schema({
  company: String,
  country: String,
  cities: [String],
  price: Number,
});

let Shipping = mongoose.model<IShipping>('Shipping', shippingSchema);

export default Shipping;