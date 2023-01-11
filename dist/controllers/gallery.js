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
exports.deleteGalleryImage = exports.addGalleryImage = exports.getGalleryImages = void 0;
const gallery_1 = __importDefault(require("../models/gallery"));
const getGalleryImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageUrls = yield gallery_1.default.find();
        return imageUrls;
    }
    catch (error) {
        throw Error('Cannot find such image');
    }
});
exports.getGalleryImages = getGalleryImages;
const addGalleryImage = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const newImageItem = new gallery_1.default(imageUrl);
    try {
        const newImage = yield newImageItem.save();
        return newImage;
    }
    catch (error) {
        throw Error('Cannot add the image');
    }
});
exports.addGalleryImage = addGalleryImage;
const deleteGalleryImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield gallery_1.default.findByIdAndDelete(id);
        return 'Image has been deleted successfully';
    }
    catch (error) {
        throw Error('Cannot delete the image');
    }
});
exports.deleteGalleryImage = deleteGalleryImage;
