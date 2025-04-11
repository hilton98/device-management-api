import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { FindCategoryService } from "../services/find-category.service";
import { FindCategoriesService } from "../services/find-categories.service";
import { CreateCategoryService } from "../services/create-category.service";
import { DeleteCategoryService } from "../services/delete-category.service";
import { FindCategoriesFiltersDto } from "../dtos/find-categories-filters.dto";
import { CreateCategoryDto } from "../dtos/create-category.dto";

@Controller('/categories')
export class CategoriesController {
    constructor(
        private readonly findCategoryService : FindCategoryService,
        private readonly findCategoriesService : FindCategoriesService,
        private readonly createCategoryService: CreateCategoryService,
        private readonly deleteCategoryService: DeleteCategoryService 
    ){}

    @Get()
    async getCategories(
        @Query() filters: FindCategoriesFiltersDto
    ) {
        return await this.findCategoriesService.execute(filters)
    }

    @Get(':id')
    async getById(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.findCategoryService.execute(id);
    }

    @Post()
    async create(
        @Body() data: CreateCategoryDto
    ) {
        return await this.createCategoryService.execute(data)
    }

    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {
        await this.deleteCategoryService.execute(id)
    }
}