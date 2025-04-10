import { DevicesEntity } from "src/device/entities/devices.entity";
import { BaseEntity } from "src/shared/db/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('categories')
export class CategoriesEntity extends BaseEntity {

    @Column({
        name: 'name',
        type: 'varchar',
        length: '128'
    })
    name: string;

    @OneToMany(
        () => DevicesEntity,
        (device) => device.category
    )
    devices: DevicesEntity[];
}