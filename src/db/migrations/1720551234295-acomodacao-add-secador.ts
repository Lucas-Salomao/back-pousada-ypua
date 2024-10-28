import { MigrationInterface, QueryRunner } from "typeorm";

export class AcomodacaoAddSecador1720551234295 implements MigrationInterface {
    name = 'AcomodacaoAddSecador1720551234295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_secador" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_secador"`);
    }

}
