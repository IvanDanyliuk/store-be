import mongoose from 'mongoose';
import Product from '../models/product';


export const getProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getProduct = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: any, res: any) => {
  const newProductItem = new Product(req.body);
  try {
    const newProduct = await newProductItem.save();
    res.status(200).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const { updatedProduct } = req.body;
    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.status(200).json('Product has been updated successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    await Product.findByIdAndDelete(id);
    res.status(200).json('Product has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};