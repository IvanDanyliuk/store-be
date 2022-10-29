import { Router } from 'express';
import { 
  getAllProducts, 
  getProductsByCategory, 
  getTopProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/products';


const router = Router();

router.get('/all', getAllProducts);
router.get('/', getProductsByCategory);
router.get('/top-rated', getTopProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/', updateProduct);
router.delete('/', deleteProduct);

export default router;