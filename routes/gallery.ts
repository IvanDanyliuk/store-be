import { Router, Request, Response } from 'express';
import { 
  getGalleryImages, 
  addGalleryImage, 
  deleteGalleryImage 
} from '../controllers/gallery';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const galleryImageUrls = await getGalleryImages();
    res.status(200).json(galleryImageUrls);
  } catch (error: any) {
    res.status(500).json(error);
  }
});
router.post('/', async (req: Request, res: Response) => {
  const { imageUrl } = req.body.params;
  try {
    const newImage = await addGalleryImage(imageUrl);
    res.status(200).json(newImage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});
router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const deletionSuccessMessage = await deleteGalleryImage(id);
    res.status(200).json(deletionSuccessMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;