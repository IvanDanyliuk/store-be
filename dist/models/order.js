"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("./product"));
const user_1 = __importDefault(require("./user"));
const orderSchema = new mongoose_1.default.Schema({
    products: [product_1.default],
    user: user_1.default,
    isPaid: Boolean,
    isShipped: Boolean,
    paymentMethod: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
let Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
