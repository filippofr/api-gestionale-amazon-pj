import {PurchaseItem} from "./purchase-item.model";
import {ObjectId} from "mongoose";
import {Item} from "../item/item.model";
import {Item as iItem} from "../item/item.entity";
import {Provider} from "../provider/provider.model";
import {Purchase} from "../purchase/purchase.model";
import {each} from "lodash";

export class PurchaseItemService {

    async addPurchaseItem(acquistoID: string, asinCode: string, prezzoUnitarioAcquisto: number, quantitaAcquistata: number) {
        try {
            const item = await Item.findOne({asin: asinCode});

            if (!item) {
                throw new Error("Item not found");
            }

            const asin = item._id;
            const giacenza = item.giacenza! + quantitaAcquistata;

            const createdElement = await PurchaseItem.create({
                acquistoID,
                asin,
                prezzoUnitarioAcquisto,
                quantitaAcquistata
            });

            //const updatedItem = await Item.findByIdAndUpdate(asin, {giacenza});

            return await PurchaseItem.findById(createdElement._id).populate('asin acquistoID');
        } catch (err) {
            throw new Error("Item not found");
        }
    }

    async getPurchaseItems() {
        return await PurchaseItem.find().populate('asin acquistoID');
    }

    async getPurchaseItemById(id: string) {
        return await PurchaseItem.findById(id).populate('asin acquistoID');
    }

    async updatePurchaseItem(id: string, acquistoID: string, asin: string, prezzoUnitarioAcquisto: number, quantitaAcquistata: number) {
        let item = await this.getPurchaseItemById(id);
        if (!item) {
            throw new Error("PurchaseItem not found");
        }
        await PurchaseItem.findByIdAndUpdate(id, {
            acquistoID,
            asin,
            prezzoUnitarioAcquisto,
            quantitaAcquistata
        }).populate('asin acquistoID');
        return await this.getPurchaseItemById(id);
    }

    async deletePurchaseItem(id: string) {
        const item = await this.getPurchaseItemById(id);
        if (!item) {
            throw new Error("PurchaseItem not found");
        }
        await PurchaseItem.findByIdAndDelete(id).populate('asin acquistoID');
        return item;
    }


    async purchaseItemAnalysis(startDate?: Date, endDate?: Date, providerId?: string, categoriaID?: number) {
        const query: any = {};
        if (startDate && endDate) {
            const acquisto = await Purchase.find({dataFattura: {$gte: startDate, $lte: endDate}});
            if (acquisto.length > 0) {
                const acquistoIds = acquisto.map(acquisto => acquisto.id);
                query['acquistoID'] = {$in: acquistoIds};
            }
        }
        if (providerId) {
            const acquisto = await Purchase.find({fornitoreId: providerId});
            if (acquisto.length > 0) {
                const acquistoIds = acquisto.map(acquisto => acquisto.id);
                query['acquistoID'] = {$in: acquistoIds};
            }
        }
        if (categoriaID) {
            const items = await Item.find<iItem>({categoriaID});
            if (items.length > 0) {
                const itemIds = items.map(item => item.id);
                query['asin'] = {$in: itemIds};
            }
        }
        return PurchaseItem.find(query).populate('asin acquistoID');
    }



    purchaseItemAnalysisAggregate(
        startDate?: Date,
        endDate?: Date,
        itemId?: string,
        providerId?: string,
        categoryId?: number
    ) {
        // Create an empty array for filters with a specific type
        let matchFilters: Record<string, any>[] = [];

        // If startDate and endDate are provided, add a filter for dataFattura
        if (startDate && endDate) {
            matchFilters.push({
                dataFattura: {
                    $gte: startDate,
                    $lte: endDate
                }
            });
        }

        // If itemId is provided, add a filter for asin
        if (itemId) {
            matchFilters.push({asin: itemId});
        }

        // If providerId is provided, add a filter for fornitoreId
        if (providerId) {
            matchFilters.push({fornitoreId: providerId});
        }

        // If categoryId is provided, add a filter for categoriaID
        if (categoryId) {
            matchFilters.push({categoriaID: categoryId});
        }

        // Execute the aggregation
        return PurchaseItem.aggregate([
            {
                $match: {
                    $and: matchFilters
                }
            },
            {
                $group: {
                    _id: {
                        week: {$week: "$dataFattura"},
                        year: {$year: "$dataFattura"},
                        asin: "$asin",
                        fornitoreId: "$fornitoreId",
                        categoriaID: "$categoriaID"
                    },
                    totalQuantity: {$sum: "$quantitaAcquistata"},
                    totalAmount: {$sum: {$multiply: ["$quantitaAcquistata", "$prezzoUnitarioAcquisto"]}}
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.week": 1
                }
            }
        ]);
    }


}
export default new PurchaseItemService();