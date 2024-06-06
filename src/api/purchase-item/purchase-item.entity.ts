import {ObjectId} from "mongoose";

export interface PurchaseItemEntity {
    id?: string;
    asin: ObjectId | string;
    acquistoID?:  ObjectId | string;
    prezzoUnitarioAcquisto?: number;
    quantitaAcquistata?: number;
}