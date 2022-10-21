import mongoose, { Schema } from 'mongoose';
import { IReview } from '../types';


const reviewSchema = new mongoose.Schema({
  productId: String,
  productImageUrl: String,
  userFirstName: String,
  userLastName: String,
  userEmail: String, 
  userAvatarUrl: String,
  advantages: String,
  disadvantages: String,
  comment: String,
  rate: Number,
  likes: [String],
  dislikes: [String],
  date: Date,
});

let Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;