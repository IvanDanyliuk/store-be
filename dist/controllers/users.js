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
exports.deleteUser = exports.updatePassword = exports.updateUser = exports.signup = exports.signin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser) {
            throw Error('User does not exist.');
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            throw Error('Invalid credentials.');
        }
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
        return ({ result: existingUser, token });
    }
    catch (error) {
        throw Error(error);
    }
});
exports.signin = signin;
const signup = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, avatarUrl, email, password, confirmPassword, phone, city, orders, isAdmin } = userData;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            throw Error('User already exists.');
        }
        if (password !== confirmPassword) {
            throw Error('Passwords don\'t match.');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield user_1.default.create({ email, password: hashedPassword, firstName, lastName, avatarUrl, phone, city, orders, isAdmin });
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' });
        return ({ result: newUser, token });
    }
    catch (error) {
        throw Error(error);
    }
});
exports.signup = signup;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
    }
    catch (error) {
        throw Error('Cannot update a user');
    }
});
exports.updateUser = updateUser;
const updatePassword = (id, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(id);
        const isPasswordMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (isPasswordMatch) {
            const hashedNewPassword = yield bcryptjs_1.default.hash(newPassword, 12);
            //@ts-ignore
            const updated = yield user_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, user._doc), { password: hashedNewPassword }), { new: true });
            return updated;
        }
        else {
            throw Error('Passwords don\'t match.');
        }
    }
    catch (error) {
        throw Error(error);
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndDelete(id);
        return 'User has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete a user');
    }
});
exports.deleteUser = deleteUser;
