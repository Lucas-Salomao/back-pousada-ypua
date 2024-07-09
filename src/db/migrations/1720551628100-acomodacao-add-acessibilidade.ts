import { MigrationInterface, QueryRunner } from "typeorm";

export class AcomodacaoAddAcessibilidade1720551628100 implements MigrationInterface {
    name = 'AcomodacaoAddAcessibilidade1720551628100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_acessibilidade" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_acessibilidade"`);
    }

}
