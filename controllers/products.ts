import mongoose from 'mongoose';
import Product from '../models/product';


export const getProducts = async (page: any, productsPerPage: any, category: any, filterData: any) => {
  
  try {
    const response = category ? 
      await Product.find({ 'category.subCategory.url': category }) : 
      await Product.find();
      
    const parsedFilterData = filterData && JSON.parse(filterData);

    const products = filterData ? 
      response
        .filter(product => parsedFilterData!.brands.length > 0 ? 
          parsedFilterData!.brands.includes(product.brand) : 
          product
        )
        .filter(product => parsedFilterData.maxPrice > 0 ? 
          product.price >= parsedFilterData.minPrice && product.price <= parsedFilterData.maxPrice : 
          product.price >= parsedFilterData.minPrice
        ) : response;

    const pages = filterData ? 
      Math.ceil(products.length / productsPerPage) : 
      Math.ceil(response.length / productsPerPage);

    return ({ 
      data: products.slice(productsPerPage * (page - 1), productsPerPage * page), 
      pages
    });
  } catch (error: any) {
    throw Error('Products not found');
  }
};

export const getTopProducts = async (productsNumber: any) => {
  try {
    const products = await Product.find();
    const sortedProducts = products.sort((acc, cur) => cur.rating - acc.rating);
    const topRated = sortedProducts.length > productsNumber ? sortedProducts.slice(0, productsNumber) : sortedProducts;
    return ({ data: topRated, pages: topRated.length / productsNumber });
  } catch (error: any) {
    throw Error('Products not found');
  }
};

export const getProduct = async (id: any) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error: any) {
    throw Error('Cannot find a product by passed id');
  }
};

export const findProducts = async (title: any) => {
  try {
    const requestValue = new RegExp(title);
    const products = await Product.find({ title: { $regex: requestValue, $options: 'i' } });
    return products;
  } catch (error: any) {
    throw Error('Cannot find products');
  }
};

export const getBrands = async (category: any) => {
  try {
    const products = await Product.find({ 'category.subCategory.url': category });
    const brands = [...new Set(products.map(product => product.brand))];
    return brands;
  } catch (error: any) {
    throw Error('Cannot find brands');
  }
};

export const createProduct = async (product: any) => {
  const newProductItem = new Product(product);
  try {
    const newProduct = await newProductItem.save();
    return newProduct;
  } catch (error: any) {
    throw Error('Cannot create a new product');
  }
};

export const updateProduct = async (id: any, updatedProduct: any) => {
  try {
    const updated = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    return updated;
  } catch (error: any) {
    throw Error('Cannot update a product');
  }
};

export const deleteProduct = async (id: any) => {
  try {
    await Product.findByIdAndDelete(id);
    return 'Product has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete a product');
  }
};