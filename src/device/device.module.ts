import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "./entities";
import { CategoryModule } from "src/category/category.module";
import { DevicesRepository } from "./repositories/devices.repository";
import { CreateDeviceService } from "./services/create-device.service";
import { DeleteDeviceService } from "./services/delete-device.service";
import { FindDeviceService } from "./services/find-device.service";
import { FindDevicesService } from "./services/find-devices.service";
import { DevicesController } from "./controllers/device.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(entities),
        CategoryModule
    ],
    controllers: [
        DevicesController
    ],
    providers: [
        DevicesRepository,
        CreateDeviceService,
        DeleteDeviceService,
        FindDeviceService,
        FindDevicesService
    ]
})
export class DeviceModule {}