import { Router, Request, Response } from 'express';
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

router.get('/', async (req: Request, res: Response) => {
  const { page, productsPerPage, category, filterData } = req.query;
  try {
    const products = await getProducts(page, productsPerPage, category, filterData);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(404).json(error);
  }
});

router.get('/top-rated', async (req: Request, res: Response) => {
  const { productsNumber } = req.query;
  try {
    const topProducts = await getTopProducts(productsNumber);
    res.status(200).json(topProducts);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.get('/brands', async (req: Request, res: Response) => {
  const { category } = req.query;
  try {
    const brands = await getBrands(category);
    res.status(200).json(brands);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.get('/search', async (req: Request, res: Response) => {
  const { title } = req.query;
  try {
    const products = await findProducts(title);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getProduct(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(404).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { product } = req.body.params;
  try {
    const newProduct = await createProduct(product);
    res.status(200).json(newProduct);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, updatedProduct } = req.body.params.updatedProduct;
  try {
    const updated = await updateProduct(id, updatedProduct);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const productDeletingMessage = await deleteProduct(id);
    res.status(200).json(productDeletingMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;