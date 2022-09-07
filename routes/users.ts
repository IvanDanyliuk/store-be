import { Router } from 'express';
import { 
  signin, 
  signup,  
  updateUser, 
  deleteUser 
} from '../controllers/users';


const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/', updateUser);
router.delete('/', deleteUser);

export default router;