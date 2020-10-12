import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1602501732398 implements MigrationInterface {
	name = "InitialMigration1602501732398";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "account_orm" ("id" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_3bedc4aca930ff6b9df944ee5ae" UNIQUE ("email"), CONSTRAINT "PK_4835b5939250a5d26cc06db1120" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "account_orm"`);
	}
}
