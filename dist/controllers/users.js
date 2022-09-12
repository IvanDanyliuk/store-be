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
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body.params.userData;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, avatarUrl, email, password, confirmPassword, phone, city, orders, isAdmin } = req.body.params.userData;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords don\'t match.' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield user_1.default.create({ email, password: hashedPassword, firstName, lastName, avatarUrl, phone, city, orders, isAdmin });
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' });
        res.status(200).json({ result: newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});
exports.signup = signup;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userData } = req.body.params.userData;
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, userData, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, currentPassword, newPassword } = req.body.params.passwordData;
        const user = yield user_1.default.findById(id);
        const isPasswordMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (isPasswordMatch) {
            const hashedNewPassword = yield bcryptjs_1.default.hash(newPassword, 12);
            //@ts-ignore
            const updated = yield user_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, user._doc), { password: hashedNewPassword }), { new: true });
            res.status(200).json(updated);
        }
        else {
            res.status(500).json('Passwords don\'t match.');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        yield user_1.default.findByIdAndDelete(id);
        res.status(200).json('User has been deleted successfully');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
