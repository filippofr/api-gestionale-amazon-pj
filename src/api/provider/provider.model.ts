import mongoose from "mongoose";
import { ProviderEntity } from "./provider.entity";

export const providerSchema = new mongoose.Schema<ProviderEntity>({
    fornitore: String
});

providerSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

providerSchema.set('toObject', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const Provider = mongoose.model<ProviderEntity>('Provider', providerSchema);