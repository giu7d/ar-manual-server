import { MigrationInterface, QueryRunner } from "typeorm";

export class NextInstructionAsIdMigration1602753858207
	implements MigrationInterface {
	name = "NextInstructionAsIdMigration1602753858207";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "instruction" RENAME COLUMN "nextStep" TO "nextInstructionId"`
		);
		await queryRunner.query(
			`ALTER TABLE "instruction" DROP COLUMN "nextInstructionId"`
		);
		await queryRunner.query(
			`ALTER TABLE "instruction" ADD "nextInstructionId" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "instruction" DROP COLUMN "nextInstructionId"`
		);
		await queryRunner.query(
			`ALTER TABLE "instruction" ADD "nextInstructionId" integer`
		);
		await queryRunner.query(
			`ALTER TABLE "instruction" RENAME COLUMN "nextInstructionId" TO "nextStep"`
		);
	}
}
