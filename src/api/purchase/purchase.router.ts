import {Router} from "express";
import {validate} from "../../utils/validation.middleware";
import {addPurchaseDTO, purchaseIdDTO, updatePurchaseDTO} from "./purchase.dto";
import {addPurchase, deletePurchase, getPurchase, getPurchaseById, updatePurchase} from "./purchase.controller";

const router = Router();

//router.use(isAuthenticated);
router.get('/get', getPurchase);
router.post('/add', validate(addPurchaseDTO), addPurchase);
router.patch('/update', validate(updatePurchaseDTO), updatePurchase);
router.delete('/delete', validate(purchaseIdDTO), deletePurchase);
router.post('/getOne', validate(purchaseIdDTO), getPurchaseById);



export default router;