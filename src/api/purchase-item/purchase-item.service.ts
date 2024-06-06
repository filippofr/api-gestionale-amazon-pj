import {PurchaseItem} from "./purchase-item.model";
import {ObjectId} from "mongoose";
import {Item} from "../item/item.model";

export class PurchaseItemService {

    async addPurchaseItem(acquistoID: string, asinCode: string, prezzoUnitarioAcquisto: number, quantitaAcquistata: number) {
        try{
        const item = await Item.findOne({asin : asinCode});

        if(!item){
            throw new Error("Item not found");
        }

        const asin = item._id;
        const giacenza = item.giacenza! + quantitaAcquistata;

        const createdElement = await PurchaseItem.create({acquistoID, asin, prezzoUnitarioAcquisto, quantitaAcquistata});

        const updatedItem = await Item.findByIdAndUpdate(asin, {giacenza});

        return await PurchaseItem.findById(createdElement._id).populate('asin acquistoID');
    }
    catch(err) {
        throw new Error("Item not found");
    }
    }

    async getPurchaseItems(){
        return await PurchaseItem.find().populate('asin acquistoID');
    }

    async getPurchaseItemById(id:string) {
        return await PurchaseItem.findById(id).populate('asin acquistoID');
    }

    async updatePurchaseItem(id:string, acquistoID: string, asin: string, prezzoUnitarioAcquisto: number, quantitaAcquistata: number){
        let item = await this.getPurchaseItemById(id);
        if(!item){
            throw new Error("PurchaseItem not found");
        }
        await PurchaseItem.findByIdAndUpdate(id, {acquistoID, asin, prezzoUnitarioAcquisto, quantitaAcquistata}).populate('asin acquistoID');
        return await this.getPurchaseItemById(id);
    }

    async deletePurchaseItem(id:string){
        const item = await this.getPurchaseItemById(id);
        if(!item){
            throw new Error("PurchaseItem not found");
        }
        await PurchaseItem.findByIdAndDelete(id).populate('asin acquistoID');
        return item;
    }


}
export default new PurchaseItemService();