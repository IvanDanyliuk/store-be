import mongoose from 'mongoose';
import Shipping from '../models/shipping';


export const getShipping = async (req: any, res: any) => {
  try {
    const shipping = await Shipping.find();
    res.status(200).json(shipping);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createShipping = async (req: any, res: any) => {
  const newShippingItem = new Shipping(req.body.params.shipping);
  console.log(req.body.params.shipping)
  try {
    const newShipping = await newShippingItem.save();
    res.status(200).json(newShipping);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShipping = async (req: any, res: any) => {
  try {
    const { id, updatedShipping } = req.body.params.updatedShipping;
    const updated = await Shipping.findByIdAndUpdate(id, updatedShipping, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShipping = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    await Shipping.findByIdAndDelete(id);
    res.status(200).json('Shipping has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};