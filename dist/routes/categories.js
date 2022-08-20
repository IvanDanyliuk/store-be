"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
const router = (0, express_1.Router)();
router.get('/', categories_1.getCategories);
router.post('/', categories_1.createCategory);
router.patch('/', categories_1.updateCategory);
router.delete('/', categories_1.deleteCategory);
exports.default = router;
