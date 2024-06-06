
import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { AddItemDTO, QueryItemDTO, ModifyItemDTO, DeleteItemDTO } from "./item.dto";
import { add, remove, list, modify } from "./item.controller";
//import { loginValidator } from "../../utils/login-checker";

const router = Router();
//router.use(isAuthenticated);

// lista tutti item
router.get('/',/* validate(QueryItemDTO),*/ list);        
// aggiunge item
router.post('', validate(AddItemDTO, 'body'), add);            

// eliminazione item specifico
router.delete(
    "/:id",
    //loginValidator(""), //boh
    validate(DeleteItemDTO, 'body'),
    remove
);

// modifica item specifico
router.patch(
    "/:id",
    //loginValidator("1"),
    validate(ModifyItemDTO, "body"),
    validate(ModifyItemDTO, "params"),
    modify
);

export default router;


