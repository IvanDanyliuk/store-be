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
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, productsPerPage, filterData } = req.query;
    try {
        const products = yield (0, products_1.getProducts)(page, productsPerPage, filterData);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json(error);
    }
}));
router.get('/top-rated', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productsNumber } = req.query;
    try {
        const topProducts = yield (0, products_1.getTopProducts)(productsNumber);
        res.status(200).json(topProducts);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/brands', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const brands = yield (0, products_1.getBrands)(category);
        res.status(200).json(brands);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    try {
        const products = yield (0, products_1.findProducts)(title);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, products_1.getProduct)(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(404).json(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = req.body.params;
    try {
        const newProduct = yield (0, products_1.createProduct)(product);
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, updatedProduct } = req.body.params.updatedProduct;
    try {
        const updated = yield (0, products_1.updateProduct)(id, updatedProduct);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const productDeletingMessage = yield (0, products_1.deleteProduct)(id);
        res.status(200).json(productDeletingMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
