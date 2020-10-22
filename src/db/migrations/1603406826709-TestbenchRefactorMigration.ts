import { MigrationInterface, QueryRunner } from "typeorm";

export class TestbenchRefactorMigration1603406826709
	implements MigrationInterface {
	name = "TestbenchRefactorMigration1603406826709";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "testbench" ADD "thumbnailSrc" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "testbench" DROP COLUMN "thumbnailSrc"`
		);
	}
}
