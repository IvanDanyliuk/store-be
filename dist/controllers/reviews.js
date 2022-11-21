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
const getUserReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const reviews = yield review_1.default.find({ userEmail: email });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserReviews = getUserReviews;
const getProductReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.query;
    try {
        const reviews = yield review_1.default.find({ productId });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProductReviews = getProductReviews;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newReviewInstance = new review_1.default(req.body.params.review);
    try {
        const newReview = yield newReviewInstance.save();
        res.status(200).json(newReview);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedReview } = req.body.params.updatedReview;
    try {
        const updated = yield review_1.default.findByIdAndUpdate(id, updatedReview, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield review_1.default.findByIdAndDelete(id);
        res.status(200).json('Review has been deleted successfully');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteReview = deleteReview;
