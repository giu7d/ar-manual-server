import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationshipMigration1603884341272 implements MigrationInterface {
	name = "RelationshipMigration1603884341272";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "testBenchId"`);
		await queryRunner.query(
			`ALTER TABLE "analysis" ADD "testBenchId" uuid NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "accountId"`);
		await queryRunner.query(
			`ALTER TABLE "analysis" ADD "accountId" uuid NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "analysis" ADD CONSTRAINT "FK_34a216797489e3dddc7e7890583" FOREIGN KEY ("testBenchId") REFERENCES "testbench"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "analysis" ADD CONSTRAINT "FK_84320d4ef12d815123b107313cc" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "analysis" DROP CONSTRAINT "FK_84320d4ef12d815123b107313cc"`
		);
		await queryRunner.query(
			`ALTER TABLE "analysis" DROP CONSTRAINT "FK_34a216797489e3dddc7e7890583"`
		);
		await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "accountId"`);
		await queryRunner.query(
			`ALTER TABLE "analysis" ADD "accountId" character varying NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "testBenchId"`);
		await queryRunner.query(
			`ALTER TABLE "analysis" ADD "testBenchId" character varying NOT NULL`
		);
	}
}
