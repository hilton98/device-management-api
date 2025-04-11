import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, MaxLength } from "class-validator";

export class CreateDeviceDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    categoryId?: number;

    @IsOptional()
    @IsString()
    @MaxLength(128)
    categoryName?: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
        message: 'The name must contain only letters',
    })
    @MaxLength(16)
    color: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    partNumber: number;
}