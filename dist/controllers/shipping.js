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
const getShipping = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shipping = yield shipping_1.default.find();
        return shipping;
    }
    catch (error) {
        throw Error('Cannot find shipping');
    }
});
exports.getShipping = getShipping;
const createShipping = (shipping) => __awaiter(void 0, void 0, void 0, function* () {
    const newShippingItem = new shipping_1.default(shipping);
    try {
        const newShipping = yield newShippingItem.save();
        return newShipping;
    }
    catch (error) {
        throw Error('Cannot create a new shipping');
    }
});
exports.createShipping = createShipping;
const updateShipping = (id, updatedShipping) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield shipping_1.default.findByIdAndUpdate(id, updatedShipping, { new: true });
        return updated;
    }
    catch (error) {
        throw Error('Cannot update a shipping');
    }
});
exports.updateShipping = updateShipping;
const deleteShipping = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield shipping_1.default.findByIdAndDelete(id);
        return 'Shipping has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete a shipping');
    }
});
exports.deleteShipping = deleteShipping;
