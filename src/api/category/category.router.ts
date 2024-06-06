import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { QueryCategoryDTO } from "./category.dto";
import { list } from "./category.controller";
//import { loginValidator } from "../../utils/login-checker";

const router = Router();
//router.use(isAuthenticated);

// lista tutti item
router.get('/',/* validate(QueryCategoryDTO),*/ list);        

export default router;