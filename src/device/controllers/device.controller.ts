import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { FindDeviceService } from "../services/find-device.service";
import { FindDevicesService } from "../services/find-devices.service";
import { CreateDeviceService } from "../services/create-device.service";
import { DeleteDeviceService } from "../services/delete-device.service";
import { FindDevicesFiltersDto } from "../dtos/find-devices-filters.dto";
import { CreateDeviceDto } from "../dtos/create-device.dto";
import { ItemRelationsDto } from "src/shared/dtos/item-relations.dto";

@Controller('/devices')
export class DevicesController {
    constructor(
        private readonly findDeviceService : FindDeviceService,
        private readonly findDevicesService : FindDevicesService,
        private readonly createDeviceService: CreateDeviceService,
        private readonly deleteDeviceService: DeleteDeviceService 
    ) {}

    @Get()
    async getDevices(
        @Query() filters: FindDevicesFiltersDto
    ) {
        return await this.findDevicesService.execute(filters)
    }

    @Get(':id')
    async getById(
        @Param('id', ParseIntPipe) id: number,
        @Query() filters: ItemRelationsDto

    ) {
        return await this.findDeviceService.execute(id, filters);
    }

    @Post()
    async create(
        @Body() data: CreateDeviceDto
    ) {
        return await this.createDeviceService.execute(data)
    }

    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {
        await this.deleteDeviceService.execute(id)
    }

}