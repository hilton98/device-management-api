import { Transform, Type } from "class-transformer";
import { 
    IsArray,
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength
} from "class-validator";

export class FindCategoriesFiltersDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    itemsPerPage?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    id?: number;
    
    @IsOptional()
    @IsString()
    @MaxLength(128)
    name?: string;
    
    @IsOptional()
    @IsString()
    lessThanCreatedAt?: string;

    @IsOptional()
    @IsString()
    moreThanCreatedAt?: string;

    @IsOptional()
    @IsString()
    lessThanUpdatedAt?: string;
    
    @IsOptional()
    @IsString()
    moreThanUpdatedAt?: string;

    @IsOptional()
    @IsString()
    createdAt?: string;

    @IsOptional()
    @IsString()
    updatedAt?: string;                        
    
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    relations?: string[]
}