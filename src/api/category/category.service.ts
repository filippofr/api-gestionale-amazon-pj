import { Category } from "./category.entity";
import { Category as CategoryModel } from "./category.model";

export class CategoryService{

    // questo dovrebbe prendere tutti gli item
    async list() {
        const list = await CategoryModel.find({});
        return list;
    }

}

export default new CategoryService();