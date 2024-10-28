import { MigrationInterface, QueryRunner } from "typeorm";

export class AcomodacaoMaiorDescricao1720568003519 implements MigrationInterface {
    name = 'AcomodacaoMaiorDescricao1720568003519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(255) NOT NULL`);
    }

}
