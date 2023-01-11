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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body.params.userData;
    try {
        const authData = yield (0, users_1.signin)(email, password);
        res.status(200).json(authData);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userData } = req.body.params;
    try {
        const authData = yield (0, users_1.signup)(userData);
        res.status(200).json(authData);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userData } = req.body.params.userData;
    try {
        const updatedUser = yield (0, users_1.updateUser)(id, userData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/update-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, currentPassword, newPassword } = req.body.params.passwordData;
    try {
        const updated = yield (0, users_1.updatePassword)(id, currentPassword, newPassword);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const userDeletingMessage = yield (0, users_1.deleteUser)(id);
        res.status(200).json(userDeletingMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
