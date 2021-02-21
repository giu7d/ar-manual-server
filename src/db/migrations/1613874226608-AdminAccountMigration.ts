import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminAccountMigration1613874226608 implements MigrationInterface {
	name = "AdminAccountMigration1613874226608";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "account" ADD "isAdmin" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "isAdmin"`);
	}
}
