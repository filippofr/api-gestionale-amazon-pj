import {TypedRequest} from "../../utils/typed-request.interface";
import {NextFunction, Response, Request} from "express";
import {addPurchaseItemDTO, idPurchaseItemDTO, updatePurchaseItemDTO} from "./purchase-item.dto";
import PurchaseItemService from "./purchase-item.service";
import {PurchaseItem} from "./purchase-item.model";
import {PurchaseItemEntity} from "./purchase-item.entity";
import PurchaseService from "../purchase/purchase.service";


export const addPurchaseItem = async(
    req: TypedRequest<addPurchaseItemDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const items = req.body.items;
        const results: PurchaseItemEntity[] = [];
        const acquisto = await PurchaseService.addPurchase(req.body.fornitoreId, req.body.dataFattura, req.body.numeroFattura);

        for (const item of items) {
            const acquistoID = acquisto.id;
            const asin = item.asin;
            const prezzoUnitarioAcquisto = item.prezzoUnitarioAcquisto;
            const quantitaAcquistata = item.quantitaAcquistata;

            const result = await PurchaseItemService.addPurchaseItem(acquistoID, asin, prezzoUnitarioAcquisto, quantitaAcquistata);
            results.push(result!);
        }

        res.json(results);
    }
    catch(err){
        next(err);
    }
}

export const getPurchaseItems = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const result = await PurchaseItemService.getPurchaseItems();

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const getPurchaseItemById = async(
    req: TypedRequest<idPurchaseItemDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const id = req.body.id;

        const result = await PurchaseItemService.getPurchaseItemById(id);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const updatePurchaseItem = async(
    req: TypedRequest<updatePurchaseItemDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const id = req.body.id;
        const acquistoID = req.body.acquistoID;
        const asin = req.body.asin;
        const prezzoUnitarioAcquisto = req.body.prezzoUnitarioAcquisto;
        const quantitaAcquistata = req.body.quantitaAcquistata;

        const result = await PurchaseItemService.updatePurchaseItem(id, acquistoID, asin, prezzoUnitarioAcquisto, quantitaAcquistata);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

export const deletePurchaseItem = async(
    req: TypedRequest<idPurchaseItemDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const id = req.body.id;

        const result = await PurchaseItemService.deletePurchaseItem(id);

        res.json(result);
    }
    catch(err){
        next(err);
    }
}

