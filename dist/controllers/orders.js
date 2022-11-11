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
exports.deleteOrder = exports.payOrder = exports.updateOrder = exports.createOrder = exports.getUserOrders = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, ordersPerPage, filterData } = req.query;
    try {
        const response = !filterData ?
            yield order_1.default.find() :
            yield order_1.default.find({ 'customer.lastName': filterData });
        const pages = Math.ceil(response.length / ordersPerPage);
        const orders = response.slice(ordersPerPage * (page - 1), ordersPerPage * page);
        res.status(200).json({
            data: orders,
            pages
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOrders = getOrders;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, ordersPerPage, email } = req.query;
        const response = yield order_1.default.find({ 'customer.email': email });
        const pages = Math.ceil(response.length / ordersPerPage);
        const orders = response.slice(ordersPerPage * (page - 1), ordersPerPage * page);
        res.status(200).json({
            data: orders,
            pages
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserOrders = getUserOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderItem = new order_1.default(req.body.params.order);
        const newOrder = newOrderItem.save();
        res.status(200).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, updatedOrder } = req.body.params.updatedOrder;
        const updated = yield order_1.default.findByIdAndUpdate(id, updatedOrder, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateOrder = updateOrder;
const payOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.payOrder = payOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        yield order_1.default.findByIdAndDelete(id);
        res.status(200).json('The order had been successfully deleted!');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteOrder = deleteOrder;
