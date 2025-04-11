import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterTableDevices1744314737109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'devices',
            'fk_device_category'
        )

        await queryRunner.createForeignKey(
            'devices',
            new TableForeignKey({
                name: 'fk_device_category',
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'devices',
            'fk_device_category'
        )

        await queryRunner.createForeignKey(
            'devices',
            new TableForeignKey({
                name: 'fk_device_category',
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'devices',
                onDelete: 'CASCADE'
            })
        )
    }

}
