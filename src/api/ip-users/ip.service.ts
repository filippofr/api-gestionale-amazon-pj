import { IpAddress } from './ip.entity';
import { IpAddress as IpAddressModel } from './ip.model';

export class IpAddressService {

  async add(ip: String, result: string): Promise<IpAddress> {
    const newItem = await IpAddressModel.create({ipAddress: ip, result: result});
    await newItem.populate('ipAddress result');
    return newItem;
  }
}

export default new IpAddressService();