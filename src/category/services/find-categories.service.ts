import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "../repositories/categories.repository";
import { FindCategoriesFiltersDto } from "../dtos/find-categories-filters";

@Injectable()
export class FindCategoriesService {
    constructor(
        private readonly categoryRepository: CategoriesRepository,
    ) {}

    async execute(
        filters: FindCategoriesFiltersDto
    ) {
        const categoriesFinded = await this.categoryRepository.find(filters);
        return categoriesFinded;
    }
}