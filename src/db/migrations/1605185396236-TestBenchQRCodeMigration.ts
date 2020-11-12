import {MigrationInterface, QueryRunner} from "typeorm";

export class TestBenchQRCodeMigration1605185396236 implements MigrationInterface {
    name = 'TestBenchQRCodeMigration1605185396236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testbench" ADD "qrCodeSrc" character varying NOT NULL DEFAULT 'placeholder-value'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testbench" DROP COLUMN "qrCodeSrc"`);
    }

}
