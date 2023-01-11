import mongoose from 'mongoose';
import Category from '../models/category';
import { ICategory } from './../types';


export const getCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error: any) {
    throw Error('Cannot find categories');
  }
};

export const createCategory = async (category: ICategory) => {
  const newCategoryItem = new Category();
  try {
    const newCategory = await newCategoryItem.save();
    return newCategory;
  } catch (error: any) {
    throw Error('Cannot create a new category');
  }
};

export const updateCategory = async (id: string, updatedCategory: ICategory) => {
  try {
    const updated = await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
    return updated;
  } catch (error: any) {
    throw Error('Cannot update a category');
  }
};

export const deleteCategory = async (id: any) => {
  try {
    await Category.findByIdAndDelete(id);
    return 'Category has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete category');
  }
};