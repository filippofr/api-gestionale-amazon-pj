import axios from "axios";
import { Order } from "./order.entity";
import { OrderSchema } from "./order.model";

export class OrderService {
  async list() {
    const response = await axios.get('https://testbobphp2.altervista.org/projectwork_its_vi/orders.php');
    return response.data;
  }

  async add(order: Order): Promise<Order | undefined>{
    const orderExist = await OrderSchema.findOne({ AmazonOrderId: order.AmazonOrderId });
    if (orderExist) {
      return;
    }
    const newOrder = await OrderSchema.create(order);
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return await OrderSchema.find();
  }

  async fetchOrders(): Promise<Order[]> {
    const amazonOrders = await this.list();
    const orders = amazonOrders.payload.Orders;
    const orderList: Order[] = [];
    
    for (const orderamz of orders) {
      const order: Order = {
        AmazonOrderId: orderamz.AmazonOrderId,
        PurchaseDate: orderamz.PurchaseDate,
        MarketplaceId: orderamz.MarketplaceId
      }
      const o = await this.add(order);
      if (o)
        orderList.push(o);
    }

    return orderList;
  }


}

export default new OrderService();