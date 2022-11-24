import mongoose, { Schema } from "mongoose";
import { IGallery } from "types";


const gallerySchema = new mongoose.Schema({
  url: String,
});

let Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);

export default Gallery;