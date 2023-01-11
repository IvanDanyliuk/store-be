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
const gallery_1 = require("../controllers/gallery");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleryImageUrls = yield (0, gallery_1.getGalleryImages)();
        res.status(200).json(galleryImageUrls);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageUrl } = req.body.params;
    try {
        const newImage = yield (0, gallery_1.addGalleryImage)(imageUrl);
        res.status(200).json(newImage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const deletionSuccessMessage = yield (0, gallery_1.deleteGalleryImage)(id);
        res.status(200).json(deletionSuccessMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
