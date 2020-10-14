import { MigrationInterface, QueryRunner } from "typeorm";

export class ActiveStatusEntitiesMigration1602671696144
	implements MigrationInterface {
	name = "ActiveStatusEntitiesMigration1602671696144";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "account" ADD "isActive" boolean NOT NULL DEFAULT true`
		);
		await queryRunner.query(
			`ALTER TABLE "testbench" ADD "isActive" boolean NOT NULL DEFAULT true`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "testbench" DROP COLUMN "isActive"`);
		await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "isActive"`);
	}
}
