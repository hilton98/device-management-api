import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "../repositories/categories.repository";
import { FindCategoryService } from "./find-category.service";

@Injectable()
export class DeleteCategoryService {
    constructor(
        private readonly categoryRepository: CategoriesRepository,
        private readonly findCategoryService: FindCategoryService,
    ){}

    async execute(id: number) {
        try {
            const category = await this.findCategoryService.execute(id);
            await this.categoryRepository.delete(category);
        } catch (error) {
            throw new NotFoundException(`DeleteCategoryService -> ${error}`)
        }
    }
}