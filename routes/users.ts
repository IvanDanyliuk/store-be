import { Router } from 'express';
import { 
  signin, 
  signup,  
  updateUser, 
  updatePassword,
  deleteUser 
} from '../controllers/users';


const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/', updateUser);
router.patch('/update-password', updatePassword);
router.delete('/', deleteUser);

export default router;