import { Router } from 'express';
import { 
  getGalleryImages, 
  addGalleryImage, 
  deleteGalleryImage 
} from '../controllers/gallery';


const router = Router();

router.get('/', getGalleryImages);
router.post('/', addGalleryImage);
router.delete('/', deleteGalleryImage);

export default router;