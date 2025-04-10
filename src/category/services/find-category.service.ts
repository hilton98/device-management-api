import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "../repositories/categories.repository";
import { CategoriesEntity } from "../entities/categories.entity";

@Injectable()
export class FindCategoryService {
    constructor(
        private readonly categoryRepository: CategoriesRepository,
    ) {}

    async execute(id: number) {
        const categoryFinded = await this.categoryRepository.findById(id);
        if (!categoryFinded) {
            throw new NotFoundException(`FindCategoryService: Category with id ${id} not found`)
        }
        return categoryFinded;
    }

}