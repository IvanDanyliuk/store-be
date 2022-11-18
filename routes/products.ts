import { Router } from 'express';
import { 
  getProducts, 
  getTopProducts, 
  getProduct, 
  findProducts, 
  getBrands, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/products';


const router = Router();

router.get('/', getProducts);
router.get('/top-rated', getTopProducts);
router.get('/brands', getBrands);
router.get('/search', findProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/', updateProduct);
router.delete('/', deleteProduct);

export default router;