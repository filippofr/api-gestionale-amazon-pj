import {Provider} from "./provider.model"

export class ProviderService{

    async addProvider(fornitore: string) {
        const existingProvider = await Provider.findOne({'fornitore': fornitore});
        if(existingProvider){

        }else{
            return await Provider.create({fornitore});

        }

    }

    async getProviders(){
        return await Provider.find();
    }

    async getProviderById(id:string){
        return await Provider.findById(id);
    }

    async updateProvider(id:string, provider:string){
        let item = await this.getProviderById(id);
        if(!item){
            throw new Error("Provider not found");
        }
        await Provider.findByIdAndUpdate(id, {fornitore: provider});
        item = await this.getProviderById(id);
        return item;
    }

    async deleteProvider(id:string){
        const item = await this.getProviderById(id);
        if(!item){
            throw new Error("Provider not found");
        }
        await Provider.findByIdAndDelete(id);
        return item;
    }
}

export default new ProviderService();