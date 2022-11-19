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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getBrands = exports.findProducts = exports.getProduct = exports.getTopProducts = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, productsPerPage, category, filterData } = req.query;
    try {
        const response = category ?
            yield product_1.default.find({ 'category.subCategory.url': category }) :
            yield product_1.default.find();
        const parsedFilterData = filterData && JSON.parse(filterData);
        const products = filterData ?
            response
                .filter(product => parsedFilterData.brands.includes(product.brand))
                .filter(product => parsedFilterData.maxPrice > 0 ?
                product.price >= parsedFilterData.minPrice && product.price <= parsedFilterData.maxPrice :
                product.price >= parsedFilterData.minPrice) : response;
        const pages = filterData ?
            Math.ceil(products.length / productsPerPage) :
            Math.ceil(response.length / productsPerPage);
        res.status(200).json({
            data: products.slice(productsPerPage * (page - 1), productsPerPage * page),
            pages
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProducts = getProducts;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productsNumber } = req.query;
    try {
        const products = yield product_1.default.find();
        const sortedProducts = products.sort((acc, cur) => cur.rating - acc.rating);
        const topRated = sortedProducts.length > productsNumber ? sortedProducts.slice(0, productsNumber) : sortedProducts;
        res.status(200).json({ data: topRated, pages: topRated.length / productsNumber });
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
const findProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    try {
        const requestValue = new RegExp(title);
        const products = yield product_1.default.find({ title: { $regex: requestValue, $options: 'i' } });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.findProducts = findProducts;
const getBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const products = yield product_1.default.find({ 'category.subCategory.url': category });
        const brands = [...new Set(products.map(product => product.brand))];
        res.status(200).json(brands);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBrands = getBrands;
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
