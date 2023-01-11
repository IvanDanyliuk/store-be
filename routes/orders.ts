import { Router, Request, Response } from 'express';
import { 
  getOrders, 
  getUserOrders, 
  createOrder, 
  updateOrder, 
  payOrder,
  deleteOrder 
} from '../controllers/orders';


const router = Router();

router.get('/admin', async (req: Request, res: Response) => {
  const { page, ordersPerPage, filterData } = req.query;
  try {
    const orders = await getOrders(page, ordersPerPage, filterData);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.get('/user', async (req: Request, res: Response) => {
  const { page, ordersPerPage, email } = req.query;
  try {
    const orders = await getUserOrders(page, ordersPerPage, email);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { order } = req.body.params;
  try {
    const newOrder = await createOrder(order);
    res.status(200).json(newOrder);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, updatedOrder } = req.body.params.updatedOrder;
  try {
    const updated = await updateOrder(id, updatedOrder);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.post('/payment', async (req: Request, res: Response) => {
  try {
    const paymentMessage = await payOrder();
    res.status(200).json(paymentMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const orderDeletingMessage = await deleteOrder(id);
    res.status(200).json(orderDeletingMessage)
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;