import {IsArray, IsDate, IsMongoId, IsNumber, IsOptional, IsString, Min} from "class-validator";
import {Type} from "class-transformer";

export class singlePurchaseItemDTO{

    @IsString()
    asin: string;

    @IsString()
    @IsMongoId()
    acquistoID: string;

    @IsNumber()
    @Min(1)
    prezzoUnitarioAcquisto: number;

    @IsNumber()
    @Min(1)
    quantitaAcquistata: number;

}

export class updatePurchaseItemDTO{

    @IsString()
    @IsMongoId()
    id: string;

    @IsString()
    @IsMongoId()
    @IsOptional()
    acquistoID: string;

    @IsString()
    @IsOptional()
    asin: string;

    @IsNumber()
    @IsOptional()
    prezzoUnitarioAcquisto: number;

    @IsNumber()
    @IsOptional()
    quantitaAcquistata: number;

}

export class idPurchaseItemDTO{

    @IsString()
    @IsMongoId()
    id: string;

}

export class addPurchaseItemDTO{

    @IsString()
    @IsMongoId()
    fornitoreId: string;

    @IsDate()
    @IsOptional()
    @Type(()=>Date)
    dataFattura: Date;

    @IsString()
    numeroFattura: string;

    @IsArray()
    items: singlePurchaseItemDTO[];

}