import mongoose, { Schema } from "mongoose";
import { Category as iCategory} from "./category.entity";

const categorySchema = new Schema<iCategory>({ 
    catID: { type: Number, default: 0, required: true},
    catName: { type: String, default: null }
});

categorySchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  categorySchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Category = mongoose.model<iCategory>('Category', categorySchema);
