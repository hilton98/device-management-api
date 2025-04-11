import { Injectable } from "@nestjs/common";
import { DevicesRepository } from "../repositories/devices.repository";
import { FindDevicesFiltersDto } from "../dtos/find-devices-filters.dto";

@Injectable()
export class FindDevicesService {
    constructor(
        private readonly devicesRepository: DevicesRepository
    ) {}

    async execute(
        filters: FindDevicesFiltersDto
    ) {
        const devicesFinded = await this.devicesRepository.find(filters);
        return devicesFinded;
    }
} 