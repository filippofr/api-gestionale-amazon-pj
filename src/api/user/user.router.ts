import { Router } from "express";
import {confirmAccount, me} from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import {validate} from "class-validator";
import {paramDTO} from "./user.dto";


const router = Router();

router.get('/me', isAuthenticated, me);
router.get('/confirm-account/:id', confirmAccount);
export default router;