import { Router } from 'express';
import { createUserController } from '../../controllers/auth/auth.controllers';

const router = Router();

router.post('/register', createUserController);

export default router;