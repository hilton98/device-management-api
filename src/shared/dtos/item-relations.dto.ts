import { Transform } from "class-transformer";
import { IsArray, IsOptional } from "class-validator";

export class ItemRelationsDto {
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    relations?: string[]
}