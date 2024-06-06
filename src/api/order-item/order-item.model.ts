import mongoose from 'mongoose';
import { OrderItem } from './order-item.entity';

export const orderItemSchema = new mongoose.Schema<OrderItem>({
  AmazonOrderId: String,
  ASIN: String,
  Title: String,
  QuantityOrdered: Number,
  ItemPrice: {
    type: {
      CurrencyCode: String,
      Amount: Number
    }
  }
});

orderItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

orderItemSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const OrderItemSchema = mongoose.model<OrderItem>('OrderItem', orderItemSchema);