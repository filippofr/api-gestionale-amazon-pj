import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation.middleware";
import {add, login, confirmAccount, recoveryPasswordEmail, resetPassword, recoveryPassword} from "./auth.controller";
import {AddUserDTO, LoginDTO, RecoveryPasswordDTO, ResetPasswordDTO} from "./auth.dto";


const router = Router();

router.post('/register', validate(AddUserDTO, 'body'), add);
router.post('/login', validate(LoginDTO), login);
router.post('/reset', isAuthenticated, validate(ResetPasswordDTO, 'body'), resetPassword);
router.get('/confirm-account/:id', confirmAccount);
router.get('/recovery-password/:email', recoveryPasswordEmail);
router.post('/recovery-password', validate(RecoveryPasswordDTO, 'body'), recoveryPassword);

export default router;