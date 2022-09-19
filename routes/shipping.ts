import { Router } from 'express';
import { 
  getShipping, 
  createShipping, 
  updateShipping, 
  deleteShipping 
} from '../controllers/shipping';


const router = Router();

router.get('/', getShipping);
router.post('/', createShipping);
router.patch('/', updateShipping);
router.delete('/', deleteShipping);

export default router;