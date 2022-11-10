import { Router } from 'express';
import { 
  getVacancies,
  getVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy
 } from '../controllers/vacancies';


 const router = Router();

 router.get('/', getVacancies);
 router.get('/:id', getVacancy);
 router.post('/', createVacancy);
 router.patch('/', updateVacancy);
 router.delete('/', deleteVacancy);

 export default router;