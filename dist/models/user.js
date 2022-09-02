"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    avatarUrl: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
let User = mongoose_1.default.model('User', userSchema);
exports.default = User;
