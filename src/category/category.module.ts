import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "./entities";
import { CategoriesRepository } from "./repositories/categories.repository";
import { CreateCategoryService } from "./services/create-category.service";
import { FindCategoriesService } from "./services/find-categories.service";
import { FindCategoryService } from "./services/find-category.service";
import { DeleteCategoryService } from "./services/delete-category.service";
import { CategoriesController } from "./controllers/category.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(entities)
    ],
    controllers: [
        CategoriesController,
    ],
    providers: [
        CategoriesRepository,
        CreateCategoryService,
        FindCategoriesService,
        FindCategoryService,
        DeleteCategoryService
    ]
})
export class CategoryModule {}