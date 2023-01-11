"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getProductReviews = exports.getUserReviews = void 0;
const review_1 = __importDefault(require("../models/review"));
const getUserReviews = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.default.find({ userEmail: email });
        return reviews;
    }
    catch (error) {
        throw Error('Cannot get reviews for this user');
    }
});
exports.getUserReviews = getUserReviews;
const getProductReviews = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.default.find({ productId });
        return reviews;
    }
    catch (error) {
        throw Error('Cannot find reviews for this product');
    }
});
exports.getProductReviews = getProductReviews;
const createReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const newReviewInstance = new review_1.default(review);
    try {
        const newReview = yield newReviewInstance.save();
        return newReview;
    }
    catch (error) {
        throw Error('Cannot create a new review');
    }
});
exports.createReview = createReview;
const updateReview = (id, updatedReview) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield review_1.default.findByIdAndUpdate(id, updatedReview, { new: true });
        return updated;
    }
    catch (error) {
        throw Error('Cannot update a review');
    }
});
exports.updateReview = updateReview;
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield review_1.default.findByIdAndDelete(id);
        return 'Review has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete a review');
    }
});
exports.deleteReview = deleteReview;
