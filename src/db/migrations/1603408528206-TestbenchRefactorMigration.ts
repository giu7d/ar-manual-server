import { MigrationInterface, QueryRunner } from "typeorm";

export class TestbenchRefactorMigration1603408528206
	implements MigrationInterface {
	name = "TestbenchRefactorMigration1603408528206";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "testbench" ADD "thumbnailSrc" character varying NOT NULL DEFAULT 'placeholder-value'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "testbench" DROP COLUMN "thumbnailSrc"`
		);
	}
}
