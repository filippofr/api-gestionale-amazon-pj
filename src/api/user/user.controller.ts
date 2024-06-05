import { NextFunction, Response, Request } from "express";
import {TypedRequest} from "../../utils/typed-request.interface";
import  UserService  from "./user.service";
import {paramDTO} from "./user.dto";

export const me = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
  res.json(req.user!);
}

export const confirmAccount = async(
    req: TypedRequest<any, any, paramDTO>,
    res: Response,
    next: NextFunction
) => {
  const id = req.params.id;
  console.log(id);
  const message = await UserService.changeConfirmed(id);
  res.json(message);
}