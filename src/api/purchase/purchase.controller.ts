import {TypedRequest} from "../../utils/typed-request.interface";
import {NextFunction, Response, Request} from "express";
import {addPurchaseDTO, purchaseIdDTO, updatePurchaseDTO} from "./purchase.dto";
import PurchaseService from "./purchase.service";

export const addPurchase = async(
    req: TypedRequest<addPurchaseDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const fornitoreId = req.body.fornitoreId;
        const dataFattura = req.body.dataFattura;
        const numeroFattura = req.body.numeroFattura;

        const returned = await PurchaseService.addPurchase(fornitoreId, dataFattura, numeroFattura);

        res.json(returned);
    }
    catch(err){
        next(err);
    }
}

export const getPurchase = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const result = await PurchaseService.getPurchases();

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const getPurchaseById = async(
    req: TypedRequest<purchaseIdDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const purchaseId = req.body.id;

        const result = await PurchaseService.getPurchaseById(purchaseId);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const updatePurchase = async(
    req: TypedRequest<updatePurchaseDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const purchaseId = req.body.id;
        const fornitoreId = req.body.fornitoreId;
        const dataFattura = req.body.dataFattura;
        const numeroFattura = req.body.numeroFattura;

        const result = await PurchaseService.updatePurchase(purchaseId, fornitoreId, dataFattura, numeroFattura);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const deletePurchase = async(
    req: TypedRequest<purchaseIdDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const purchaseId = req.body.id;

        const result = await PurchaseService.deletePurchase(purchaseId);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const processPurchase = async(
    req: TypedRequest<purchaseIdDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const purchaseId = req.body.id;

        const result = await PurchaseService.processPurchase(purchaseId);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}