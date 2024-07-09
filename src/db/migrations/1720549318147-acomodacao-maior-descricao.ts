import { MigrationInterface, QueryRunner } from "typeorm";

export class AcomodacaoMaiorDescricao1720549318147 implements MigrationInterface {
    name = 'AcomodacaoMaiorDescricao1720549318147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(100) NOT NULL`);
    }

}
