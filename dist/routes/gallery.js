"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_1 = require("../controllers/gallery");
const router = (0, express_1.Router)();
router.get('/', gallery_1.getGalleryImages);
router.post('/', gallery_1.addGalleryImage);
router.delete('/', gallery_1.deleteGalleryImage);
exports.default = router;
