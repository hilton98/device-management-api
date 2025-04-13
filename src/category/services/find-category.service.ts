import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "../repositories/categories.repository";
import { ItemRelationsDto } from "src/shared/dtos/item-relations.dto";

@Injectable()
export class FindCategoryService {
    constructor(
        private readonly categoryRepository: CategoriesRepository,
    ) {}

    async execute(id: number, filters?: ItemRelationsDto) {
        const categoryFinded = await this.categoryRepository.findById(id, filters?.relations);
        if (!categoryFinded) {
            throw new NotFoundException(`FindCategoryService: Category with id ${id} not found`)
        }
        return categoryFinded;
    }

}