import { Router, Request, Response } from 'express';
import { 
  getVacancies,
  getVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy
 } from '../controllers/vacancies';


 const router = Router();

 router.get('/', async (req: Request, res: Response) => {
  const { page, itemsPerPage } = req.query;
  try {
    const vacancies = await getVacancies(page, itemsPerPage);
    res.status(200).json(vacancies);
  } catch (error: any) {
    res.status(500).json(error);
  }
 });

 router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vacancy = await getVacancy(id);
    res.status(200).json(vacancy);
  } catch (error: any) {
    res.status(500).json(error);
  }
 });

 router.post('/', async (req: Request, res: Response) => {
  const { vacancy } = req.body.params;
  try {
    const newVacancy = await createVacancy(vacancy);
    res.status(200).json(newVacancy);
  } catch (error: any) {
    res.status(500).json(error);
  }
 });

 router.patch('/', async (req: Request, res: Response) => {
  const { id, updatedVacancy } = req.body.params.updatedVacancy;
  try {
    const updated = await updateVacancy(id, updatedVacancy);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
 });

 router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const vacancyDeletingMessage = await deleteVacancy(id);
    res.status(200).json(vacancyDeletingMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
 });

 export default router;