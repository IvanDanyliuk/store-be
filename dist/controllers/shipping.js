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
exports.deleteShipping = exports.updateShipping = exports.createShipping = exports.getShipping = void 0;
const shipping_1 = __importDefault(require("../models/shipping"));
const getShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shipping = yield shipping_1.default.find();
        res.status(200).json(shipping);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getShipping = getShipping;
const createShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newShippingItem = new shipping_1.default(req.body.params.shipping);
    console.log(req.body.params.shipping);
    try {
        const newShipping = yield newShippingItem.save();
        res.status(200).json(newShipping);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createShipping = createShipping;
const updateShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, updatedShipping } = req.body.params.updatedShipping;
        const updated = yield shipping_1.default.findByIdAndUpdate(id, updatedShipping, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateShipping = updateShipping;
const deleteShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        yield shipping_1.default.findByIdAndDelete(id);
        res.status(200).json('Shipping has been deleted successfully');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteShipping = deleteShipping;
