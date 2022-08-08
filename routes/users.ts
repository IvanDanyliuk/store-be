import { Router } from 'express';
import { 
  signin, 
  signup,  
  updateUser, 
  deleteUser 
} from '../controllers/users';


const router = Router();

router.get('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;