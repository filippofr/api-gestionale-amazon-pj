import {Purchase} from "./purchase.model";
import {Item} from "../item/item.model";
import {PurchaseItem} from "../purchase-item/purchase-item.model";
import {each} from "lodash";

export class PurchaseService {

    async addPurchase(fornitoreId: string, dataFattura: Date, numeroFattura: string) {
        return await Purchase.create({fornitoreId, dataFattura, numeroFattura});
    }

    async getPurchases(){
        return await Purchase.find().populate('fornitoreId');
    }

    async getPurchaseById(id:string) {
        return await Purchase.findById(id).populate('fornitoreId');
    }

    async updatePurchase(id:string, fornitoreId: string, dataFattura: Date, numeroFattura: string){
        let item = await this.getPurchaseById(id);
        if(!item){
            throw new Error("Purchase not found");
        }
        await Purchase.findByIdAndUpdate(id, {fornitoreId, dataFattura, numeroFattura}).populate('fornitoreId');
        return await this.getPurchaseById(id);
    }

    async deletePurchase(id:string){
        const item = await this.getPurchaseById(id);
        if(!item){
            throw new Error("Purchase not found");
        }
        await Purchase.findByIdAndDelete(id).populate('fornitoreId');
        return item;
    }

    async processPurchase(id: string){
        let purchase = await this.getPurchaseById(id);
        if(!purchase){
            throw new Error("Purchase not found");
        }
        //per ogni item in PurchaseItem con acquistoID uguale a id, aggiorna la giacenza di Item

        const items = await PurchaseItem.find({acquistoID: id});

        for (let item of items) {
            const asin = item.asin;
            const quantitaAcquistata = item.quantitaAcquistata;

            const itemToUpdate = await Item.findById(asin);
            if(!itemToUpdate) {
                throw new Error("Item not found");
            }
            const giacenza = itemToUpdate.giacenza! + quantitaAcquistata!;

            await Item.findByIdAndUpdate(itemToUpdate.id, {giacenza})

        }

        await Purchase.findByIdAndUpdate(id, {processed: true}).populate('fornitoreId');
        return await this.getPurchaseById(id);
    }


}

export default new PurchaseService();