
import { Router } from 'express';
import userController from '../controller/userController';

const router = Router();

router.post('/signin', userController.createUser);

export default router;