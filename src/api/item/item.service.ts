import { Item } from "./item.entity";
import { Item as ItemModel } from "./item.model";
import { ItemExistsError } from "../../errors/item-exists";
import { NotFoundError } from "../../errors/not-found";
import { assign } from "lodash";

export class ItemService{
    // in teoria questo dovrebbe controllare se esiste già un item e se no lo aggiunge 
    async add(item: Item) {
        const existing = await ItemModel.findOne({Item: item});
        if (existing) {
          return ItemExistsError;
        } 

        const newItem = await ItemModel.create(item);
        return newItem;
    }
    
    // questo dovrebbe prendere un item specifico? non so
    private async _getById(id: string) {
        return ItemModel.findOne({ _id: id });
    }

    // questo dovrebbe prendere tutti gli item
    async list() {
        const list = await ItemModel.find({});
        return list;
    }

    // questo *dovrebbe* funzionare, rubato e modificato dall'esercizio todo
    async update(id: string, data: Partial<Item>): Promise<Item> {
        const item = await ItemModel.findOne({ _id: id });
        if (!item) {
          throw new NotFoundError();
        }
        if(!data.title){
            data.title = item.title;
        }
        if(!data.giacenza){
            data.giacenza = item.giacenza;
        }
        if(!data.categoriaID){
            data.categoriaID = item.categoriaID;
        }
        assign(item, data);
        await item.save();
        return ItemModel.findOne({ _id: id }) as Promise<Item>;
    }

    // questo *dovrebbe* cancellare quello che trova per id
    async deleteItem(id:string):Promise<Item>{
        const item = await ItemModel.findOne({ _id: id });
        if(!item){
            throw new Error("Item not found");
        }
        await ItemModel.findByIdAndDelete(id);
        return item;
    }

}

export default new ItemService();