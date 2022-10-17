import mongoose from "mongoose";
import Review from '../models/review';


export const getUserReviews = async (req: any, res: any) => {
  const { email } = req.query;
  try {
    const reviews = await Review.find({ userEmail: email });
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req: any, res: any) => {
  const newReviewInstance = new Review(req.body.params.review);
  try {
    const newReview = await newReviewInstance.save();
    res.status(200).json(newReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req: any, res: any) => {
  const { id, updatedReview } = req.body.params.updatedReview;
  try {
    const updated = await Review.findByIdAndUpdate(id, updatedReview, { new: true });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json('Review has been deleted successfully');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};