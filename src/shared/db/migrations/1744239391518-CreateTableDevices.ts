import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableDevices1744239391518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'devices',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'category_id',
                        type: 'int'
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        length: '16'
                    },
                    {
                        name: 'part_number',
                        type: 'int'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    }
                ],
                checks: [
                    {
                        name: 'CHK_device_part_number_positive',
                        expression: `"part_number" >= 0`,
                    },
                    {
                        name: 'CHK_device_color_max_length',
                        expression: `char_length("color") <= 16`,
                    }
                ]

            })
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'devices',
            'fk_device_category'
        )
        await queryRunner.dropTable('devices')
    }

}
