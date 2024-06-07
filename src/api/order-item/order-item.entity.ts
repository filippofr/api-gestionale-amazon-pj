export interface OrderItem {
  id?: string;
  AmazonOrderId: string;
  ASIN: string;
  Title: string;
  QuantityOrdered: number;
  ItemPrice: {
    CurrencyCode: string;
    Amount: number;
  };
  processed?: boolean;
}