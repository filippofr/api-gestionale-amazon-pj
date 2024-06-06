import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { list, refreshOrders } from "./order.controller";


const router = Router();

router.get('/list', list);
router.get('/refresh', refreshOrders);

export default router;