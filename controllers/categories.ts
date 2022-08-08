import mongoose from 'mongoose';
import Category from '../models/category';


export const getCategories = async (req: any, res: any) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req: any, res: any) => {
  const newCategoryItem = new Category(req.body);
  try {
    const newCategory = await newCategoryItem.save();
    res.status(200).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const { updatedCategory } = req.body;
    await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
    res.status(200).json('Category has been updated successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    await Category.findByIdAndDelete(id);
    res.status(200).json('Category has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};