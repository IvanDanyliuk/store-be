import mongoose from 'mongoose';
import { IGallery } from 'types';
import Gallery from '../models/gallery';


export const getGalleryImages = async () => {
  try {
    const imageUrls = await Gallery.find();
    return imageUrls;
  } catch (error: any) {
    throw Error('Cannot find such image');
  }
};

export const addGalleryImage = async (imageUrl: IGallery) => {
  const newImageItem = new Gallery(imageUrl);
  try {
    const newImage = await newImageItem.save();
    return newImage;
  } catch (error: any) {
    throw Error('Cannot add the image');
  }
};

export const deleteGalleryImage = async (id: any) => {
  try {
    await Gallery.findByIdAndDelete(id);
    return 'Image has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete the image');
  }
};