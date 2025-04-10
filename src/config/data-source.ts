import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions = (
    configService: ConfigService
): DataSourceOptions => {
    return {
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity.{ts,js}'],
        logging: true,
        synchronize: false
    };
}

ConfigModule.forRoot();

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'device_management',
    password: process.env.DB_PASSWORD || 'dm1234',
    database: process.env.DB_NAME || 'device_management_db',
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/shared/db/migrations/*.js'],
    logging: true,
    synchronize: false,
    migrationsTransactionMode: 'each'
});

export default dataSource;