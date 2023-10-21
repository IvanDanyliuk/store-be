import mongoose from 'mongoose';
import Product from '../models/product';


export const getProducts = async (page: any, productsPerPage: any, filterData: any) => {
  try {
    const parsedFilterData = filterData && JSON.parse(filterData);

    const query: any = {};
    if(parsedFilterData.category) query['category.subCategory.url'] = parsedFilterData.category;
    if(parsedFilterData.brands && parsedFilterData.brands.length > 0) query.brand = { $in: parsedFilterData.brands };
    if(parsedFilterData.minPrice) query.price = { $gte: +parsedFilterData.minPrice };
    if(parsedFilterData.maxPrice) query.price = { $lte: +parsedFilterData.maxPrice };
    if(parsedFilterData.minPrice && parsedFilterData.maxPrice) query.price = { $gte: +parsedFilterData.minPrice, $lte: +parsedFilterData.maxPrice };

    const products = await Product
      .find(query)
      .skip((+page - 1) * +productsPerPage)
      .limit(+productsPerPage);

    const productsCount = await Product.countDocuments(query);
    const pages = Math.ceil(productsCount / +productsPerPage);

    console.log('GET PRODUCTS', { page, productsPerPage, productsCount, pages })

    return ({ 
      data: products, 
      pages
    });
  } catch (error: any) {
    throw Error('Products not found');
  }
};

export const getTopProducts = async (productsNumber: any) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(productsNumber || 0);

    return ({ data: products, pages: products.length / productsNumber });
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