import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CategoriesRepository } from "../repositories/categories.repository";
import { CreateCategoryDto } from "../dtos/create-category.dto";

@Injectable()
export class CreateCategoryService {
    constructor(
        private readonly categoryRepository: CategoriesRepository,
    ){}

    async execute(creationData: CreateCategoryDto) {
        try {
            const categoryCreated = await this.categoryRepository.save(creationData);
            return categoryCreated;   
        } catch(error) {
            throw new InternalServerErrorException(`CreationCategoryService - Error saving data: ${error}`);
        }
    }
}