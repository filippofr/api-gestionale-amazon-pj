import {ProviderEntity} from "../provider/provider.entity";
import {ObjectId} from "mongoose";

export interface PurchaseEntity {
    id: string,
    fornitoreId: ProviderEntity | string | ObjectId,
    dataFattura: Date,
    numeroFattura: string
}