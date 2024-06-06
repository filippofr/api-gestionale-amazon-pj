import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddItemDTO, QueryItemDTO, ModifyItemDTO, DeleteItemDTO } from "./item.dto";
import itemService from "./item.service";
import { Item } from "./item.entity";


export const list = async (req: TypedRequest<any, QueryItemDTO, any>, res: Response, next: NextFunction) => {
    //const user = req.user!;
    const list = await itemService.list();
    res.json(list);
}


export const add = async (
    req: TypedRequest<AddItemDTO>,
    res: Response,
    next: NextFunction) => {

    try {
        const user = req.user!;
        const { asin, title, giacenza, categoriaID } = req.body;

        const newItem: Item = {
            asin: asin,
            title: title,
            giacenza: giacenza,
            categoriaID: categoriaID
        };

        const saved = await itemService.add(newItem);
        res.json(saved);
    } catch (err) {
        next(err);
    }
}

export const modify = async (
    req: TypedRequest<ModifyItemDTO, any, ModifyItemDTO>,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;

    const {
        title,
        giacenza,
        categoriaID
    } = req.body;
    try {
        const updated = await itemService.update(id,
            {
                title,
                giacenza,
                categoriaID
            });
        console.log(updated);
        res.json(updated);
    } catch (err: any) {
        next(err);
    }
};

export const remove = async (
    req: TypedRequest<DeleteItemDTO>,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;

    try {
        const deletedItem = await itemService.deleteItem(id);
        res.json(deletedItem);
    } catch (err: any) {
        next(err);
    }
};