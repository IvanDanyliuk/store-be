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
const getOrders = (page, ordersPerPage, filterData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = !filterData ?
            yield order_1.default.find() :
            yield order_1.default.find({ 'customer.lastName': filterData });
        const pages = Math.ceil(response.length / ordersPerPage);
        const orders = response.slice(ordersPerPage * (page - 1), ordersPerPage * page);
        return ({
            data: orders,
            pages
        });
    }
    catch (error) {
        throw Error('Cannot find orders');
    }
});
exports.getOrders = getOrders;
const getUserOrders = (page, ordersPerPage, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield order_1.default.find({ 'customer.email': email });
        const pages = Math.ceil(response.length / ordersPerPage);
        const orders = response.slice(ordersPerPage * (page - 1), ordersPerPage * page);
        return ({
            data: orders,
            pages
        });
    }
    catch (error) {
        throw Error('Cannot find orders');
    }
});
exports.getUserOrders = getUserOrders;
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderItem = new order_1.default(order);
        const newOrder = newOrderItem.save();
        return newOrder;
    }
    catch (error) {
        throw Error('Cannot create an order');
    }
});
exports.createOrder = createOrder;
const updateOrder = (id, updatedOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield order_1.default.findByIdAndUpdate(id, updatedOrder, { new: true });
        return updated;
    }
    catch (error) {
        throw Error('Cannot update an order');
    }
});
exports.updateOrder = updateOrder;
const payOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return 'Currently payment is not available';
    }
    catch (error) {
        throw Error('Cannot pay an order');
    }
});
exports.payOrder = payOrder;
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_1.default.findByIdAndDelete(id);
        return 'The order had been successfully deleted!';
    }
    catch (error) {
        throw Error('Cannot delete an order');
    }
});
exports.deleteOrder = deleteOrder;
