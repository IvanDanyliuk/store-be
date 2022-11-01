import { Router } from 'express';
import { 
  getProducts, 
  getTopProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/products';


const router = Router();

router.get('/', getProducts);
router.get('/top-rated', getTopProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/', updateProduct);
router.delete('/', deleteProduct);

export default router;