"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: String,
    category: {
        main: {
            title: String,
            url: String,
        },
        subCategory: {
            title: String,
            url: String,
        },
    },
    description: String,
    price: Number,
    color: String,
    rating: Number,
    mainImageUrl: String,
    imageUrls: [String],
    promotion: [String],
    isInStock: Boolean,
    shortInfo: String,
    reviews: [{
            user: {
                firstName: String,
                lastName: String,
                email: String,
                avatarUrl: String,
            },
            comment: String,
            likes: Number,
            dislikes: Number,
            date: Date,
        }],
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
let Product = mongoose_1.default.model('Products', productSchema);
exports.default = Product;