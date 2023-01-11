import { Router, Request, Response } from 'express';
import { 
  signin, 
  signup,  
  updateUser, 
  updatePassword,
  deleteUser 
} from '../controllers/users';


const router = Router();

router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body.params.userData;
  try {
    const authData = await signin(email, password);
    res.status(200).json(authData);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.post('/signup', async (req: Request, res: Response) => {
  const { userData } = req.body.params;
  try {
    const authData = await signup(userData);
    res.status(200).json(authData);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, userData } = req.body.params.userData;
  try {
    const updatedUser = await updateUser(id, userData);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.patch('/update-password', async (req: Request, res: Response) => {
  const { id, currentPassword, newPassword } = req.body.params.passwordData;
  try {
    const updated = await updatePassword(id, currentPassword, newPassword);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const userDeletingMessage = await deleteUser(id);
    res.status(200).json(userDeletingMessage);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

export default router;