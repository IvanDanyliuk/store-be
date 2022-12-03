"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    main: {
        title: String,
        url: String,
    },
    subCategories: [{
            title: String,
            url: String,
            image: String,
        }]
});
let Category = mongoose_1.default.model('Categories', categorySchema);
exports.default = Category;
