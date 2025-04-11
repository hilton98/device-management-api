import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableCategories1744312755163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`categories\`
            ADD CONSTRAINT \`UQ_categories_name\` UNIQUE (\`name\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`categories\`
            DROP CONSTRAINT \`UQ_categories_name\`
        `);
    }

}
