import { Injectable, NotFoundException } from "@nestjs/common";
import { DevicesRepository } from "../repositories/devices.repository";
import { FindDeviceService } from "./find-device.service";

@Injectable()
export class DeleteDeviceService {
    constructor(
        private readonly devicesRepository: DevicesRepository,
        private readonly findDeviceService: FindDeviceService,
    ){}

    async execute(id: number) {
        try {
            const category = await this.findDeviceService.execute(id);
            await this.devicesRepository.delete(category);
        } catch (error) {
            throw new NotFoundException(`DeleteDeviceService -> ${error}`)
        }
    }
}