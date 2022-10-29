"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: String,
    brand: String,
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
    image: String,
    promotion: [String],
    isInStock: Boolean,
    shortInfo: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
let Product = mongoose_1.default.model('Products', productSchema);
exports.default = Product;
