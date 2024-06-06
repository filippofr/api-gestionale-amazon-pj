import { NextFunction, Request, Response } from "express";
import orderItemSrv from "./order-item.service";

export const fetch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemsAdded = await orderItemSrv.fetchItems();
    res.json(itemsAdded);
  }
  catch (err) {
    next(err);
  }
}

export const findAll = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await orderItemSrv.findAll();
    res.json(items);
  }
  catch (err) {
    next(err);
  }
}