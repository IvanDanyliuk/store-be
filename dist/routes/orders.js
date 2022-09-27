"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const router = (0, express_1.Router)();
router.get('/', orders_1.getOrders);
router.get('/', orders_1.getUserOrders);
router.post('/', orders_1.createOrder);
router.patch('/', orders_1.updateOrder);
router.patch('/payment', orders_1.payOrder);
router.delete('/', orders_1.deleteOrder);
exports.default = router;
