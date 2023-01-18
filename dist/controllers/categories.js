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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find();
        return categories;
    }
    catch (error) {
        throw Error('Cannot find categories');
    }
});
exports.getCategories = getCategories;
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategoryItem = new category_1.default(category);
    try {
        const newCategory = yield newCategoryItem.save();
        return newCategory;
    }
    catch (error) {
        throw Error('Cannot create a new category');
    }
});
exports.createCategory = createCategory;
const updateCategory = (id, updatedCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield category_1.default.findByIdAndUpdate(id, updatedCategory, { new: true });
        return updated;
    }
    catch (error) {
        throw Error('Cannot update a category');
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield category_1.default.findByIdAndDelete(id);
        return 'Category has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete category');
    }
});
exports.deleteCategory = deleteCategory;
