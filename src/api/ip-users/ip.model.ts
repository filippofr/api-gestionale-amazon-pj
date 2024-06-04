import mongoose, { Schema } from "mongoose";
import { IpAddress as iIpAddress } from "./ip.entity";

export const ipAddressSchema = new mongoose.Schema<iIpAddress>({
    date: {type: Date, default: new Date()},
    ipAddress: String,
    result: String
  });

ipAddressSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

ipAddressSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
})



export const IpAddress = mongoose.model<iIpAddress>('IpAddress', ipAddressSchema);