import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import providerRouter from "./provider/provider.router";
import purchaseRouter from "./purchase/purchase.router";

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/providers', providerRouter)
router.use('/purchases', purchaseRouter)

export default router;