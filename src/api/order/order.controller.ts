import { NextFunction, Request, Response } from "express";
import orderSrv from "./order.service";
import { Order } from "./order.entity";

export const list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orders = await orderSrv.list();
  res.json(orders);
}

export const refreshOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderSrv.fetchOrders();

    res.json({message: "Orders fetched successfully"});
  }
  catch (err) {
    next(err);
  }
}