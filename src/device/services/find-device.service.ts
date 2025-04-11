import { Injectable, NotFoundException } from "@nestjs/common";
import { DevicesRepository } from "../repositories/devices.repository";

@Injectable()
export class FindDeviceService {
    constructor(
        private readonly devicesRepository: DevicesRepository,
    ) {}

    async execute(id: number) {
        const deviceFinded = await this.devicesRepository.findById(id);
        if (!deviceFinded) {
            throw new NotFoundException(`FindDeviceService: Device with id ${id} not found`)
        }
        return deviceFinded;
    }
}