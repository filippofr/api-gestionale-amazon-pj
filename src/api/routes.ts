import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import orderRouter from './order/order.route';
import orderItemRouter from './order-item/order-item.route';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/order-items', orderItemRouter);

export default router;