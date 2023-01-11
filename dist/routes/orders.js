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
const orders_1 = require("../controllers/orders");
const router = (0, express_1.Router)();
router.get('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, ordersPerPage, filterData } = req.query;
    try {
        const orders = yield (0, orders_1.getOrders)(page, ordersPerPage, filterData);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, ordersPerPage, email } = req.query;
    try {
        const orders = yield (0, orders_1.getUserOrders)(page, ordersPerPage, email);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order } = req.body.params;
    try {
        const newOrder = yield (0, orders_1.createOrder)(order);
        res.status(200).json(newOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedOrder } = req.body.params.updatedOrder;
    try {
        const updated = yield (0, orders_1.updateOrder)(id, updatedOrder);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/payment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentMessage = yield (0, orders_1.payOrder)();
        res.status(200).json(paymentMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const orderDeletingMessage = yield (0, orders_1.deleteOrder)(id);
        res.status(200).json(orderDeletingMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
