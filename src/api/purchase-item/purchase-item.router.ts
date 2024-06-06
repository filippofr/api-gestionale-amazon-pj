import {Router} from "express";
import {
    addPurchaseItem,
    deletePurchaseItem,
    getPurchaseItems,
    getPurchaseItemById,
    updatePurchaseItem
} from "./purchase-item.controller";
import {validate} from "../../utils/validation.middleware";
import {addPurchaseItemDTO, idPurchaseItemDTO, updatePurchaseItemDTO} from "./purchase-item.dto";

const router = Router();

//router.use(isAuthenticated);
router.get('/get', getPurchaseItems);
router.post('/add', validate(addPurchaseItemDTO), addPurchaseItem);
router.patch('/update', validate(updatePurchaseItemDTO), updatePurchaseItem);
router.delete('/delete', validate(idPurchaseItemDTO), deletePurchaseItem);
router.post('/getOne', validate(idPurchaseItemDTO), getPurchaseItemById);



export default router;