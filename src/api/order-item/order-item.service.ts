import axios from "axios";
import { OrderItem } from "./order-item.entity";
import { OrderItemSchema } from "./order-item.model";
import orderSrv from "../order/order.service";
import itemSrv from "../item/item.service";
import { NotFoundError } from "../../errors/not-found";

export class OrderItemService {
  async listItems(orderId: string) {
    const response = await axios.get(`https://testbobphp2.altervista.org/projectwork_its_vi/orderitems.php?AmazonOrderID=${orderId}`);
    return response.data;
  }

  async addItem(item: OrderItem): Promise<OrderItem | undefined>{
    const orderItemExist = await OrderItemSchema.findOne({ ASIN: item.ASIN });
    if (orderItemExist) {
      return;
    }
    const newOrderItem = await OrderItemSchema.create(item);
    return newOrderItem;
  }
  
  async findAll(): Promise<OrderItem[]> {
    return await OrderItemSchema.find();
  }

  async fetchItems() {
    // const orderItemList: OrderItem[] = [];
    for (const item of await orderSrv.findAll()) {
      const items = await this.listItems(item.AmazonOrderId);
      const orderItems = items.payload.OrderItems;
      
      for (const orderItemamz of orderItems) {

        const i = await itemSrv.getByAsin(orderItemamz.ASIN)
        if (!i) {
          throw new NotFoundError();
        }
        i.giacenza! -= orderItemamz.QuantityOrdered;
        await itemSrv.update(i.id, i);

        const orderItem: OrderItem = {
          AmazonOrderId: item.AmazonOrderId,
          ASIN: orderItemamz.ASIN,
          Title: orderItemamz.Title,
          QuantityOrdered: orderItemamz.QuantityOrdered,
          ItemPrice: {
            CurrencyCode: orderItemamz.ItemPrice.CurrencyCode,
            Amount: orderItemamz.ItemPrice.Amount
          },
          processed: true
        }
        const o = await this.addItem(orderItem);
        // if (o)
        //   orderItemList.push(o);
      }
    }
  }
}

export default new OrderItemService();