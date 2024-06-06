import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import itemRouter from './item/item.router';
import categoryRouter from './category/category.router'
const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/categories', categoryRouter);

export default router;