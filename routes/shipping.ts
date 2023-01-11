import { Router, Request, Response } from 'express';
import { 
  getShipping, 
  createShipping, 
  updateShipping, 
  deleteShipping 
} from '../controllers/shipping';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const shipping = await getShipping();
    res.status(200).json(shipping);
  } catch (error: any) {
    res.status(404).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { shipping } = req.body.params;
  try {
    const newShipping = await createShipping(shipping);
    res.status(200).json(newShipping);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, updatedShipping } = req.body.params.updatedShipping;
  try {
    const updated = await updateShipping(id, updatedShipping);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const shippingDeletingMessage = await deleteShipping(id);
    res.status(200).json(shippingDeletingMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;