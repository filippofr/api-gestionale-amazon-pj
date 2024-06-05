import {Purchase} from "./purchase.model";

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

}

export default new PurchaseService();