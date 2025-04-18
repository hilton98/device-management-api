import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindOptionsWhere, ILike, QueryRunner, Repository } from "typeorm";
import { CategoriesEntity } from "../entities/categories.entity";
import { CategoryFilters } from "../interfaces/category-filters.interface";
import { CategoryCreate } from "../interfaces/category-create.interface";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly repository: Repository<CategoriesEntity>
    ) {}

    findById(
        id: number,
        relations?: string[]
    ): Promise<CategoriesEntity | null> {
        return this.repository.findOne(
            { 
                where: { id },
                relations: relations ?? []
            }
        )
    }

    find(filters: CategoryFilters): Promise<[CategoriesEntity[], number]> {
        const {
            page,
            itemsPerPage,
            id,
            name,
            lessThanCreatedAt,
            moreThanCreatedAt,
            lessThanUpdatedAt,
            moreThanUpdatedAt,
            createdAt,
            updatedAt,
            relations
        } = filters;

        const whereFilters: FindOptionsWhere<CategoriesEntity> = {};
        const isPaginated = page && itemsPerPage;
        const skip = isPaginated ? (page - 1) * itemsPerPage : undefined;
        const take = isPaginated ? itemsPerPage : undefined;

        if (id) {
            whereFilters.id = id;
        }

        if (name) {
            whereFilters.name = ILike(`${name}%`);
        }

        if (moreThanCreatedAt && lessThanCreatedAt) {
            whereFilters.createdAt = Between(
                new Date(moreThanCreatedAt),
                new Date(lessThanCreatedAt)
            )
        }

        if (moreThanUpdatedAt && lessThanUpdatedAt) {
            whereFilters.updatedAt = Between(
                new Date(moreThanUpdatedAt),
                new Date(lessThanUpdatedAt)
            )
        }

        if (createdAt) {
            whereFilters.createdAt = new Date(createdAt);
        }

        if (updatedAt) {
            whereFilters.updatedAt = new Date(updatedAt)
        }

        return this.repository.findAndCount({
            where: whereFilters,
            relations,
            skip,
            take
        })    

    }

    saveInContext(
        data: CategoryCreate,
        queryRunner: QueryRunner
    ): Promise<CategoriesEntity> {
        return queryRunner.manager.save(
            queryRunner.manager.create( CategoriesEntity, data )
        )
    }

    save(
        data: CategoryCreate
    ): Promise<CategoriesEntity> {
        return this.repository.save(data)
    }     

    delete(category: CategoriesEntity) {
        return this.repository.remove(category);        
    }
}