import mongoose from 'mongoose';
import { IShipping } from 'types';
import Shipping from '../models/shipping';


export const getShipping = async () => {
  try {
    const shipping = await Shipping.find();
    return shipping;
  } catch (error: any) {
    throw Error('Cannot find shipping');
  }
};

export const createShipping = async (shipping: IShipping) => {
  const newShippingItem = new Shipping(shipping);
  try {
    const newShipping = await newShippingItem.save();
    return newShipping;
  } catch (error: any) {
    throw Error('Cannot create a new shipping');
  }
};

export const updateShipping = async (id: any, updatedShipping: any) => {
  try {
    const updated = await Shipping.findByIdAndUpdate(id, updatedShipping, { new: true });
    return updated;
  } catch (error: any) {
    throw Error('Cannot update a shipping');
  }
};

export const deleteShipping = async (id: any) => {
  try {
    await Shipping.findByIdAndDelete(id);
    return 'Shipping has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete a shipping');
  }
};