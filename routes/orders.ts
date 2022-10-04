import { Router } from 'express';
import { 
  getOrders, 
  getUserOrders, 
  createOrder, 
  updateOrder, 
  payOrder,
  deleteOrder 
} from '../controllers/orders';


const router = Router();

router.get('/admin', getOrders);
router.get('/user', getUserOrders);
router.post('/', createOrder);
router.patch('/', updateOrder);
router.post('/payment', payOrder);
router.delete('/', deleteOrder);

export default router;