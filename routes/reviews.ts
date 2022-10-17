import { Router } from 'express';
import { 
  getUserReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviews';


const router = Router();

router.get('/', getUserReviews);
router.post('/', createReview);
router.patch('/', updateReview);
router.delete('/', deleteReview);

export default router;