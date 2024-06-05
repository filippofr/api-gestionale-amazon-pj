
import {IsMongoId, IsString} from "class-validator";

export class paramDTO{
//@IsMongoId()
    @IsString()
    id:string;
}