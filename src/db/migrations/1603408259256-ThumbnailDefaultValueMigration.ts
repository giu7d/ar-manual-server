import { MigrationInterface, QueryRunner } from "typeorm";

export class ThumbnailDefaultValueMigration1603408259256
	implements MigrationInterface {
	name = "ThumbnailDefaultValueMigration1603408259256";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "testbench" ALTER COLUMN "thumbnailSrc" SET DEFAULT 'placeholder-value'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "testbench" ALTER COLUMN "thumbnailSrc" DROP DEFAULT`
		);
	}
}
