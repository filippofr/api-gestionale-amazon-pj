import { Transform, Type } from "class-transformer";
import { IsString, IsOptional, IsInt, IsMongoId } from "class-validator";

export class AddItemDTO {
    // tutto obbligatorio per l'aggiunta perché si può fare da frontend che son obbligatori
    @IsString()
    asin: string;

    @IsString()
    title: string;

    @IsInt()
    giacenza: number;

    @IsInt()
    categoriaID: number;
}

export class QueryItemDTO {
    // Non ci sono campi specifici per la query
    // perché si tratta di una semplice richiesta per ottenere tutti gli item
    // lasciamo vuoto questo DTO?
}

export class ModifyItemDTO {
    // E' tutto opzionale perché magari non voglio modificare una certa roba
    // tranne asin che è per riconoscere l'item da modificare
    // e non è modificabile
    @IsMongoId()
    id: string;
    
    @IsString()
    asin: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsInt()
    giacenza?: number;

    @IsOptional()
    @IsInt()
    categoriaID?: number;
}

export class DeleteItemDTO {
    
    @IsMongoId()
    id: string;

    @IsString()
    asin: string;
}
