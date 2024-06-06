import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { fetch, findAll } from "./order-item.controller";


const router = Router();

router.get('/fetch-items', fetch);
router.get('/find-all', findAll)

export default router;