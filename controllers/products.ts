import mongoose from 'mongoose';
import Product from '../models/product';


export const getProducts = async (req: any, res: any) => {
  const { page, productsPerPage, category } = req.query;
  try {
    const response = category ? await Product.find({ 'category.subCategory.url': category }) : await Product.find();
    const products = response.slice(productsPerPage * (page - 1), productsPerPage * page);
    res.status(200).json({ data: products, pages: Math.ceil(response.length / productsPerPage) });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getTopProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    const sortedProducts = products.sort((acc, cur) => cur.rating - acc.rating);
    const topRated = sortedProducts.length > 10 ? sortedProducts.slice(0, 10) : sortedProducts;
    res.status(200).json({ data: topRated, pages: topRated.length / 10 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: any, res: any) => {
  const newProductItem = new Product(req.body.params.product);
  try {
    const newProduct = await newProductItem.save();
    res.status(200).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    const { id, updatedProduct } = req.body.params.updatedProduct;
    const updated = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    await Product.findByIdAndDelete(id);
    res.status(200).json('Product has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};