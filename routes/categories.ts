import { Router, Request, Response } from 'express';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categories';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(404).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { category } = req.body.params;
  try {
    const newCategory = await createCategory(category);
    res.status(200).json(newCategory);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, updatedCategory } = req.body.params;
  try {
    const updated = await updateCategory(id, updatedCategory);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const responseMessage = await deleteCategory(id);
    res.status(200).json(responseMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;