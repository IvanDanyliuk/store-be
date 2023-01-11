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
const shipping_1 = require("../controllers/shipping");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shipping = yield (0, shipping_1.getShipping)();
        res.status(200).json(shipping);
    }
    catch (error) {
        res.status(404).json(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shipping } = req.body.params;
    try {
        const newShipping = yield (0, shipping_1.createShipping)(shipping);
        res.status(200).json(newShipping);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedShipping } = req.body.params.updatedShipping;
    try {
        const updated = yield (0, shipping_1.updateShipping)(id, updatedShipping);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const shippingDeletingMessage = yield (0, shipping_1.deleteShipping)(id);
        res.status(200).json(shippingDeletingMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
