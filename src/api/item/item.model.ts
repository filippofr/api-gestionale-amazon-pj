import mongoose, { Schema } from "mongoose";
import { Item as iItem } from "./item.entity";

const itemSchema = new Schema<iItem>({ 
    asin: { type: String, required: true },
    title: { type: String, default: null },
    giacenza: { type: Number, default: 0 }, 
    categoriaID: { type: Number, default: null },
});

itemSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

itemSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Item = mongoose.model<iItem>('Item', itemSchema);
