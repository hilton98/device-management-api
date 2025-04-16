import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "../repositories/categories.repository";
import { FindCategoriesFiltersDto } from "../dtos/find-categories-filters.dto";

@Injectable()
export class FindCategoriesService {
    constructor(
        private readonly categoryRepository: CategoriesRepository,
    ) {}

    async execute(
        filters: FindCategoriesFiltersDto
    ) {
        const [ categories, total ] = await this.categoryRepository.find(filters);
        const response = { categories, total }
        return response;
    }
}