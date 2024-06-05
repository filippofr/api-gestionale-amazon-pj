import {IsMongoId, IsString} from "class-validator";

export class getProviderByIdDTO{

    @IsString()
    id:string;

}

export class addProviderDTO{
    @IsString()
    fornitore:string;
}

export class updateProviderDTO{
    @IsMongoId()
    @IsString()
    id:string;

    @IsString()
    fornitore:string;
}

