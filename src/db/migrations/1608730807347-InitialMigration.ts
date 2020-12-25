import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1608730807347 implements MigrationInterface {
    name = 'InitialMigration1608730807347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instruction_source" ("id" uuid NOT NULL, "type" character varying NOT NULL, "src" character varying NOT NULL, "instructionId" uuid, CONSTRAINT "PK_e9ff25cd4d133ff86530dbb690d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cao" ("id" uuid NOT NULL, "description" character varying NOT NULL, "items" json NOT NULL, CONSTRAINT "PK_abba4d415609cc733602160e947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "testbench" ("id" uuid NOT NULL, "componentSerialNumber" character varying NOT NULL, "testBenchSerialNumber" character varying NOT NULL, "thumbnailSrc" character varying NOT NULL DEFAULT 'placeholder-value', "qrCodeSrc" character varying NOT NULL DEFAULT 'placeholder-value', "isActive" boolean NOT NULL DEFAULT true, "caoId" uuid, CONSTRAINT "REL_cdd09a254cfbbdab841bf7a2c4" UNIQUE ("caoId"), CONSTRAINT "PK_e3db507594e1553fca798c42252" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warning" ("id" uuid NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "instructionId" uuid, CONSTRAINT "PK_54ddc381cc95ffd6909e427b093" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instruction" ("id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "step" integer NOT NULL, "nextInstructionId" character varying, "testBenchId" uuid, CONSTRAINT "PK_dd8def68dee37e3f878d0f8673a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "analysis_step" ("id" uuid NOT NULL, "status" character varying NOT NULL, "failure" json, "startedAt" TIMESTAMP NOT NULL, "finishedAt" TIMESTAMP NOT NULL, "analysisId" uuid, "instructionId" uuid, CONSTRAINT "PK_71b3633f0d0dc4582b290101075" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "analysis" ("id" uuid NOT NULL, "status" character varying NOT NULL, "startedAt" TIMESTAMP NOT NULL, "finishedAt" TIMESTAMP NOT NULL, "accountId" uuid, "testBenchId" uuid, CONSTRAINT "PK_300795d51c57ef52911ed65851f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "instruction_source" ADD CONSTRAINT "FK_c1b1911e256fd08c5ba47cdbbb1" FOREIGN KEY ("instructionId") REFERENCES "instruction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "testbench" ADD CONSTRAINT "FK_cdd09a254cfbbdab841bf7a2c41" FOREIGN KEY ("caoId") REFERENCES "cao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warning" ADD CONSTRAINT "FK_0ad09d59c116c34e52fc220e636" FOREIGN KEY ("instructionId") REFERENCES "instruction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_f2b835dd58eab3fe665952a54d3" FOREIGN KEY ("testBenchId") REFERENCES "testbench"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "analysis_step" ADD CONSTRAINT "FK_4b8cd2fd9e432efc8b7cbeb35ad" FOREIGN KEY ("analysisId") REFERENCES "analysis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "analysis_step" ADD CONSTRAINT "FK_9f6a09214ad88eb26d7d9b1c244" FOREIGN KEY ("instructionId") REFERENCES "instruction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "analysis" ADD CONSTRAINT "FK_84320d4ef12d815123b107313cc" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "analysis" ADD CONSTRAINT "FK_34a216797489e3dddc7e7890583" FOREIGN KEY ("testBenchId") REFERENCES "testbench"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" DROP CONSTRAINT "FK_34a216797489e3dddc7e7890583"`);
        await queryRunner.query(`ALTER TABLE "analysis" DROP CONSTRAINT "FK_84320d4ef12d815123b107313cc"`);
        await queryRunner.query(`ALTER TABLE "analysis_step" DROP CONSTRAINT "FK_9f6a09214ad88eb26d7d9b1c244"`);
        await queryRunner.query(`ALTER TABLE "analysis_step" DROP CONSTRAINT "FK_4b8cd2fd9e432efc8b7cbeb35ad"`);
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_f2b835dd58eab3fe665952a54d3"`);
        await queryRunner.query(`ALTER TABLE "warning" DROP CONSTRAINT "FK_0ad09d59c116c34e52fc220e636"`);
        await queryRunner.query(`ALTER TABLE "testbench" DROP CONSTRAINT "FK_cdd09a254cfbbdab841bf7a2c41"`);
        await queryRunner.query(`ALTER TABLE "instruction_source" DROP CONSTRAINT "FK_c1b1911e256fd08c5ba47cdbbb1"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "analysis"`);
        await queryRunner.query(`DROP TABLE "analysis_step"`);
        await queryRunner.query(`DROP TABLE "instruction"`);
        await queryRunner.query(`DROP TABLE "warning"`);
        await queryRunner.query(`DROP TABLE "testbench"`);
        await queryRunner.query(`DROP TABLE "cao"`);
        await queryRunner.query(`DROP TABLE "instruction_source"`);
    }

}
