"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    products: [{
            id: String,
            quantity: Number,
            product: {
                type: mongoose_1.default.Schema.Types.Mixed,
                ref: 'Products',
            },
        }],
    amount: Number,
    customer: {
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
    },
    recepient: {
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
    },
    isPaid: Boolean,
    isShipped: Boolean,
    shippingCity: String,
    shippingCompany: String,
    paymentMethod: String,
    creditCardNumber: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
let Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
