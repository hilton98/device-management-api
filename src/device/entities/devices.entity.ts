import { CategoriesEntity } from "src/category/entities/categories.entity";
import { BaseEntity } from "src/shared/db/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('devices')
export class DevicesEntity extends BaseEntity {
    
    @Column({
        name: 'category_id',
        type: 'int',
    })
    categoryId: number;

    @Column({
        name: 'color',
        type: 'varchar',
        length: '16'
    })
    color: string;

    @Column({
        name: 'part_number',
        type: 'int',
    })
    partNumber: number;

    @ManyToOne( () => CategoriesEntity, (category) => category.devices)
    @JoinColumn({name: 'category_id'})
    category: CategoriesEntity;

}