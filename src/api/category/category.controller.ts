import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { QueryCategoryDTO } from "./category.dto";
import categoryService from "./category.service";
import { Category } from "./category.entity";

export const list = async (req: TypedRequest<any, QueryCategoryDTO, any>, res: Response, next: NextFunction) => {
    //const user = req.user!;
    const list = await categoryService.list();
    res.json(list);
}