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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getTopProducts = exports.getProductsByCategory = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, productsPerPage } = req.query;
    try {
        const response = yield product_1.default.find();
        const products = response.slice(productsPerPage * (page - 1), productsPerPage * page);
        res.status(200).json({ data: products, pages: Math.ceil(response.length / productsPerPage) });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, productsPerPage, category } = req.query;
    try {
        const response = yield product_1.default.find({ 'category.subCategory.url': category });
        const products = response.slice(productsPerPage * (page - 1), productsPerPage * page);
        res.status(200).json({ data: products, pages: Math.ceil(response.length / productsPerPage) });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        const sortedProducts = products.sort((acc, cur) => cur.rating - acc.rating);
        const topRated = sortedProducts.length > 10 ? sortedProducts.slice(0, 10) : sortedProducts;
        res.status(200).json({ data: topRated, pages: topRated.length / 10 });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTopProducts = getTopProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.default.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductItem = new product_1.default(req.body.params.product);
    try {
        const newProduct = yield newProductItem.save();
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, updatedProduct } = req.body.params.updatedProduct;
        const updated = yield product_1.default.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        yield product_1.default.findByIdAndDelete(id);
        res.status(200).json('Product has been deleted successfully');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
