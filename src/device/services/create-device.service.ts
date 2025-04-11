import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DevicesRepository } from "../repositories/devices.repository";
import { CategoriesRepository } from "src/category/repositories/categories.repository";
import { CreateDeviceDto } from "../dtos/create-device.dto";
import { DataSource, EntityManager, QueryFailedError, QueryRunner } from "typeorm";

@Injectable()
export class CreateDeviceService {
    protected queryRunner: QueryRunner;
    protected manager: EntityManager;
    
    constructor(
        private readonly devicesRepository: DevicesRepository,
        private readonly categoriesRepository: CategoriesRepository,
        private readonly dataSource: DataSource,
    ) {}

    async execute(creationData: CreateDeviceDto) {
        const {
            categoryId,
            categoryName
        } = creationData;

        if (!categoryId && !categoryName) {
            throw new BadRequestException(`No category defined`)
        }
        
        try {
            this.setSetupToTransactions();
            await this.queryRunner.startTransaction();
            await this.queryRunner.connect();
            const device = await this.createDevice(creationData)
            await this.queryRunner.commitTransaction();
            return device;
        } catch (error) {
            await this.queryRunner.rollbackTransaction();
            if (error instanceof QueryFailedError && error.message.includes('ER_DUP_ENTRY')) {
                throw new ConflictException(`CreateDeviceService: Existing category name.`);
            }
            if (error instanceof QueryFailedError && error.message.includes('ER_NO_REFERENCED_ROW_2')) {
                throw new NotFoundException(`CreateDeviceService: Category not exists.`);
            }
        } finally {
            await this.queryRunner.release();
        }
    }

    async createDevice(creationData: CreateDeviceDto) {
        const {
            categoryId,
            categoryName
        } = creationData;
        let id = categoryId;
        if (!categoryId && categoryName) {
            const categoryCreated = await this.categoriesRepository.saveInContext(
                { name: categoryName }, 
                this.queryRunner
            )
            id = categoryCreated.id;
        }
        const deviceCreated = await this.devicesRepository.saveInContext(
            {
                ...creationData,
                categoryId: id
            } , 
            this.queryRunner
        )
        return deviceCreated;
    }

    private setSetupToTransactions() {
        this.queryRunner = this.dataSource.createQueryRunner()
        this.manager = this.queryRunner.manager;
    }

}