import {IsDate, IsMongoId, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class addPurchaseDTO {
    @IsString()
    @IsMongoId()
    fornitoreId: string;

    @IsDate()
    @IsOptional()
    @Type(()=>Date)
    dataFattura: Date;

    @IsString()
    numeroFattura: string;
}

export class updatePurchaseDTO {

    @IsString()
    @IsMongoId()
    id: string;

    @IsString()
    @IsMongoId()
    @IsOptional()
    fornitoreId: string;

    @IsDate()
    @IsOptional()
    @Type(()=>Date)
    dataFattura: Date;

    @IsString()
    @IsOptional()
    numeroFattura: string;
}

export class purchaseIdDTO {
    @IsString()
    @IsMongoId()
    id: string;
}

