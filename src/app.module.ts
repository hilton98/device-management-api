import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { CategoryModule } from './category/category.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService]
    }),
    CategoryModule,
    DeviceModule
  ]
})
export class AppModule {}
