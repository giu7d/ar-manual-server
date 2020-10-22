import { MigrationInterface, QueryRunner } from "typeorm";

export class AnalysisStepRefactorMigration1603370075590
	implements MigrationInterface {
	name = "AnalysisStepRefactorMigration1603370075590";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "analysis_step" ALTER COLUMN "failure" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "analysis_step" ALTER COLUMN "failure" SET NOT NULL`
		);
	}
}
