import { Injectable, NotFoundException } from "@nestjs/common";
import { DevicesRepository } from "../repositories/devices.repository";
import { ItemRelationsDto } from "src/shared/dtos/item-relations.dto";

@Injectable()
export class FindDeviceService {
    constructor(
        private readonly devicesRepository: DevicesRepository,
    ) {}

    async execute(id: number, filters?: ItemRelationsDto) {
        const deviceFinded = await this.devicesRepository.findById(id, filters?.relations);
        if (!deviceFinded) {
            throw new NotFoundException(`FindDeviceService: Device with id ${id} not found`)
        }
        return deviceFinded;
    }
}