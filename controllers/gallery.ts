import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Gallery from '../models/gallery';


export const getGalleryImages = async (req: any, res: any) => {
  try {
    const imageUrls = await Gallery.find();
    res.status(200).json(imageUrls);
  } catch (error: any) {
    res.status(500).json('Cannot find such image');
  }
};

export const addGalleryImage = async (req: any, res: any) => {
  const newImageItem = new Gallery(req.body.params.imageUrl);
  try {
    const newImage = await newImageItem.save();
    res.status(200).json(newImage);
  } catch (error: any) {
    res.status(500).json('Cannot add the image');
  }
};

export const deleteGalleryImage = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    await Gallery.findByIdAndDelete(id);
    res.status(200).json('Image has been deleted successfully');
  } catch (error: any) {
    res.status(500).json('Cannot delete the image');
  }
};