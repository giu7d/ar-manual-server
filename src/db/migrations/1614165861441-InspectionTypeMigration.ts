import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionTypeMigration1614165861441
	implements MigrationInterface {
	name = "InspectionTypeMigration1614165861441";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "instruction" ADD "inspectionType" character varying NOT NULL DEFAULT 'GEOMETRIC-INSPECTION'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "instruction" DROP COLUMN "inspectionType"`
		);
	}
}
