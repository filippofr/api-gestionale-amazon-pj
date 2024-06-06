import mongoose from 'mongoose';
import { Order } from './order.entity';

export const orderSchema = new mongoose.Schema<Order>({
  AmazonOrderId: String,
  PurchaseDate: String,
  MarketplaceId: String
});

orderSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

orderSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const OrderSchema = mongoose.model<Order>('Order', orderSchema);