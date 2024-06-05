import {Router} from "express";
import {addProvider, deleteProvider, getProviderById, getProviders, updateProvider} from "./provider.controller";
import {addProviderDTO, getProviderByIdDTO, updateProviderDTO} from "./provider.dto";
import {validate} from "../../utils/validation.middleware";


const router = Router();

//router.use(isAuthenticated);
router.get('/get', getProviders);
router.post('/add', validate(addProviderDTO), addProvider);
router.patch('/update', validate(updateProviderDTO), updateProvider);
router.delete('/delete', validate(getProviderByIdDTO), deleteProvider);
router.post('/getOne', validate(getProviderByIdDTO), getProviderById);



export default router;