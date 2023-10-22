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
const getProducts = (page, productsPerPage, filterData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedFilterData = filterData && JSON.parse(filterData);
        const query = {};
        if (filterData && parsedFilterData.category)
            query['category.subCategory.url'] = parsedFilterData.category;
        if (filterData && parsedFilterData.brands && parsedFilterData.brands.length > 0)
            query.brand = { $in: parsedFilterData.brands };
        if (filterData && parsedFilterData.minPrice)
            query.price = { $gte: +parsedFilterData.minPrice };
        if (filterData && parsedFilterData.maxPrice)
            query.price = { $lte: +parsedFilterData.maxPrice };
        if (filterData && parsedFilterData.minPrice && parsedFilterData.maxPrice)
            query.price = { $gte: +parsedFilterData.minPrice, $lte: +parsedFilterData.maxPrice };
        const products = yield product_1.default
            .find(query)
            .skip((+page - 1) * +productsPerPage)
            .limit(+productsPerPage);
        const productsCount = yield product_1.default.countDocuments(query);
        const pages = Math.ceil(productsCount / +productsPerPage);
        return ({
            data: products,
            pages
        });
    }
    catch (error) {
        throw Error('Products not found');
    }
});
exports.getProducts = getProducts;
const getTopProducts = (productsNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({}).sort({ rating: -1 }).limit(productsNumber || 0);
        return ({ data: products, pages: products.length / productsNumber });
    }
    catch (error) {
        throw Error('Products not found');
    }
});
exports.getTopProducts = getTopProducts;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(id);
        return product;
    }
    catch (error) {
        throw Error('Cannot find a product by passed id');
    }
});
exports.getProduct = getProduct;
const findProducts = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestValue = new RegExp(title);
        const products = yield product_1.default.find({ title: { $regex: requestValue, $options: 'i' } });
        return products;
    }
    catch (error) {
        throw Error('Cannot find products');
    }
});
exports.findProducts = findProducts;
const getBrands = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({ 'category.subCategory.url': category });
        const brands = [...new Set(products.map(product => product.brand))];
        return brands;
    }
    catch (error) {
        throw Error('Cannot find brands');
    }
});
exports.getBrands = getBrands;
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductItem = new product_1.default(product);
    try {
        const newProduct = yield newProductItem.save();
        return newProduct;
    }
    catch (error) {
        throw Error('Cannot create a new product');
    }
});
exports.createProduct = createProduct;
const updateProduct = (id, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield product_1.default.findByIdAndUpdate(id, updatedProduct, { new: true });
        return updated;
    }
    catch (error) {
        throw Error('Cannot update a product');
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.default.findByIdAndDelete(id);
        return 'Product has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete a product');
    }
});
exports.deleteProduct = deleteProduct;
