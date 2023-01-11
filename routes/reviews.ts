import { Router, Request, Response } from 'express';
import { 
  getUserReviews, 
  getProductReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviews';


const router = Router();

router.get('/user', async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const reviews = await getUserReviews(email);
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/product', async (req: Request, res: Response) => {
  const { productId } = req.query;
  try {
    const reviews = await getProductReviews(productId);
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { review } = req.body.params;
  try {
    const newReview = await createReview(review);
    res.status(200).json(newReview);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, updatedReview } = req.body.params.updatedReview;
  try {
    const updated = await updateReview(id, updatedReview);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const reviewDeletingMessage = await deleteReview(id);
    res.status(200).json(reviewDeletingMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;