import mongoose from "mongoose";
import { PurchaseItemEntity } from "./purchase-item.entity";

export const purchaseItemSchema = new mongoose.Schema<PurchaseItemEntity>({
    asin: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    acquistoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' },
    prezzoUnitarioAcquisto: Number,
    quantitaAcquistata: Number
});
purchaseItemSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

purchaseItemSchema.set('toObject', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const PurchaseItem = mongoose.model<PurchaseItemEntity>('PurchaseItem', purchaseItemSchema);