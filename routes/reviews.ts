import { Router } from 'express';
import { 
  getUserReviews, 
  getProductReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviews';


const router = Router();

router.get('/user', getUserReviews);
router.get('/product', getProductReviews);
router.post('/', createReview);
router.patch('/', updateReview);
router.delete('/', deleteReview);

export default router;