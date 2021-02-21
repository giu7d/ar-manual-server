import {MigrationInterface, QueryRunner} from "typeorm";

export class TimeDifferenceAnalysisMigration1613941212436 implements MigrationInterface {
    name = 'TimeDifferenceAnalysisMigration1613941212436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis_step" ADD "timeDifference" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "analysis" ADD "timeDifference" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "timeDifference"`);
        await queryRunner.query(`ALTER TABLE "analysis_step" DROP COLUMN "timeDifference"`);
    }

}
