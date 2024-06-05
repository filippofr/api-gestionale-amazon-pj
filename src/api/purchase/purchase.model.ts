import mongoose from "mongoose";
import {PurchaseEntity} from "./purchase.entity";

export const purchaseSchema = new mongoose.Schema<PurchaseEntity>({
    fornitoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    dataFattura: Date,
    numeroFattura: String
});

purchaseSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

purchaseSchema.set('toObject', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const Purchase = mongoose.model<PurchaseEntity>('Purchase', purchaseSchema);