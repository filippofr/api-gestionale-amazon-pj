import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import itemRouter from './item/item.router';
import categoryRouter from './category/category.router'
import orderRouter from './order/order.route';
import orderItemRouter from './order-item/order-item.route';
import providerRouter from "./provider/provider.router";
import purchaseRouter from "./purchase/purchase.router";
import purchaseItemRouter from "./purchase-item/purchase-item.router";

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/order-items', orderItemRouter);
router.use('/providers', providerRouter)
router.use('/purchases', purchaseRouter)
router.use('/purchase-items', purchaseItemRouter)

export default router;