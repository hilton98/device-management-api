import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString, Length, Matches, MaxLength } from "class-validator";

export class FindDevicesFiltersDto {

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
    @Type(() => Number)
    @IsInt()
    @IsPositive()        
    categoryId?: number;

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))      
    categoryIds?: number[];

    @IsOptional()
    @IsString()
    @MaxLength(128)
    categoryName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
        message: 'The name must contain only letters',
    })
    @MaxLength(16)
    color?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    partNumber?: number;

    @IsOptional()
    @IsArray()
    @Length(1, 16, {each: true})
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
        each: true,
        message: 'The name must contain only letters',
    })    
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    colors?: string[];

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    partNumbers?: number[]

    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    relations?: string[]
}