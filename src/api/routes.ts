import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);

export default router;