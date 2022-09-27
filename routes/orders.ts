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

router.get('/', getOrders);
router.get('/', getUserOrders);
router.post('/', createOrder);
router.patch('/', updateOrder);
router.patch('/payment', payOrder);
router.delete('/', deleteOrder);

export default router;