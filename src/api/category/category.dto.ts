import { Transform, Type } from "class-transformer";
import { IsString, IsOptional, IsInt, IsMongoId } from "class-validator";


// per ora basta questo, restituisco tutte le categorie
export class QueryCategoryDTO {
    // Non ci sono campi specifici per la query
}