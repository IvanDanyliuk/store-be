"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
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
    likes: Number,
    dislikes: Number,
    date: Date,
});
let Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
