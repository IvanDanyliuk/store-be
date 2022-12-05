import mongoose from 'mongoose';
import Product from '../models/product';


export const getProducts = async (req: any, res: any) => {
  const { page, productsPerPage, category, filterData } = req.query;
  try {
    const response = category ? 
      await Product.find({ 'category.subCategory.url': category }) : 
      await Product.find();
      
    const parsedFilterData = filterData && JSON.parse(filterData);

    const products = filterData ? 
      response
        .filter(product => parsedFilterData!.brands.length > 0 ? parsedFilterData!.brands.includes(product.brand) : product)
        .filter(product => parsedFilterData.maxPrice > 0 ? 
          product.price >= parsedFilterData.minPrice && product.price <= parsedFilterData.maxPrice : 
          product.price >= parsedFilterData.minPrice
        ) : response;

    const pages = filterData ? 
      Math.ceil(products.length / productsPerPage) : 
      Math.ceil(response.length / productsPerPage);

    res.status(200).json({ 
      data: products.slice(productsPerPage * (page - 1), productsPerPage * page), 
      pages
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getTopProducts = async (req: any, res: any) => {
  const { productsNumber } = req.query;
  try {
    const products = await Product.find();
    const sortedProducts = products.sort((acc, cur) => cur.rating - acc.rating);
    const topRated = sortedProducts.length > productsNumber ? sortedProducts.slice(0, productsNumber) : sortedProducts;
    res.status(200).json({ data: topRated, pages: topRated.length / productsNumber });
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

export const findProducts = async (req: any, res: any) => {
  const { title } = req.query;
  try {
    const requestValue = new RegExp(title);
    const products = await Product.find({ title: { $regex: requestValue, $options: 'i' } });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBrands = async (req: any, res: any) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ 'category.subCategory.url': category });
    const brands = [...new Set(products.map(product => product.brand))];
    res.status(200).json(brands);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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