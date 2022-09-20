"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shippingSchema = new mongoose_1.default.Schema({
    company: String,
    country: String,
    cities: [String],
    price: Number,
});
let Shipping = mongoose_1.default.model('Shipping', shippingSchema);
exports.default = Shipping;
