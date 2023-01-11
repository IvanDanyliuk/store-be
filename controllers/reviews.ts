import mongoose from "mongoose";
import { IReview } from "types";
import Review from '../models/review';


export const getUserReviews = async (email: any) => {
  try {
    const reviews = await Review.find({ userEmail: email });
    return reviews;
  } catch (error: any) {
    throw Error('Cannot get reviews for this user');
  }
};

export const getProductReviews = async (productId: any) => {
  try {
    const reviews = await Review.find({ productId });
    return reviews;
  } catch (error: any) {
    throw Error('Cannot find reviews for this product');
  }
}

export const createReview = async (review: IReview) => {
  const newReviewInstance = new Review(review);
  try {
    const newReview = await newReviewInstance.save();
    return newReview;
  } catch (error: any) {
    throw Error('Cannot create a new review');
  }
};

export const updateReview = async (id: any, updatedReview: any) => {
  try {
    const updated = await Review.findByIdAndUpdate(id, updatedReview, { new: true });
    return updated;
  } catch (error: any) {
    throw Error('Cannot update a review');
  }
};

export const deleteReview = async (id: any) => {
  try {
    await Review.findByIdAndDelete(id);
    return 'Review has been deleted successfully';
  } catch (error: any) {
    throw Error('Cannot delete a review');
  }
};