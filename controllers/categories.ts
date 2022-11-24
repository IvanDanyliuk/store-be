import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Category from '../models/category';


export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const newCategoryItem = new Category(req.body.params.category);
  try {
    const newCategory = await newCategoryItem.save();
    res.status(200).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id, updatedCategory } = req.body.params.updatedCategory;
    const updated = await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    await Category.findByIdAndDelete(id);
    res.status(200).json('Category has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};