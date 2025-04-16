import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DevicesEntity } from "../entities/devices.entity";
import { FindOptionsWhere, ILike, In, QueryRunner, Repository } from "typeorm";
import { DeviceFilters } from "../interfaces/device-filters.interface";
import { CreateDeviceDto } from "../dtos/create-device.dto";

@Injectable()
export class DevicesRepository {
    constructor(
        @InjectRepository(DevicesEntity)
        private readonly repository: Repository<DevicesEntity>
    ) {}

    findById(
        id: number,
        relations?: string[]
    ): Promise<DevicesEntity | null> {
        return this.repository.findOne(
            { 
                where: { id },
                relations: relations ?? []
            }
        )
    }

    find(filters: DeviceFilters): Promise<[DevicesEntity[], number]> {
        const {
            page,
            itemsPerPage,
            id,
            categoryId,
            categoryIds,
            categoryName,
            color,
            partNumber,
            colors,
            partNumbers,
        } = filters;

        const whereFilters: FindOptionsWhere<DevicesEntity> = {};
        const relations = filters.relations ? [...filters.relations] : [];
        const isPaginated = page && itemsPerPage;
        const skip = isPaginated ? (page - 1) * itemsPerPage : undefined;
        const take = isPaginated ? itemsPerPage : undefined;

        if (id) {
            whereFilters.id = id;
        }

        if (categoryId) {
            whereFilters.categoryId = id;
        }

        if (categoryIds) {
            whereFilters.categoryId = In(categoryIds)
        }

        if (color) {
            whereFilters.color = color;
        }

        if (partNumber) {
            whereFilters.partNumber = partNumber;
        }

        if (
            categoryName && (!filters.relations || (filters.relations && !relations?.includes('category')))
        ) {
            relations.push('category');
            whereFilters.category = {
                name: ILike(`${categoryName}%`)
            }
        }

        if (categoryName && filters.relations && relations?.includes('category')) {
            whereFilters.category = {
                name: ILike(`${categoryName}%`)
            }
        }

        if (colors && colors.length > 0) {
            whereFilters.color = In(colors)
        }

        if (partNumbers && partNumbers.length > 0) {
            whereFilters.partNumber = In(partNumbers)
        }

        return this.repository.findAndCount({
            where: whereFilters,
            relations,
            skip,
            take
        })
    }

    saveInContext(
        data: CreateDeviceDto,
        queryRunner: QueryRunner
    ): Promise<DevicesEntity> {
        return queryRunner.manager.save(
            queryRunner.manager.create( DevicesEntity, data )
        )
    }

    delete(device: DevicesEntity) {
        return this.repository.remove(device);        
    }
}