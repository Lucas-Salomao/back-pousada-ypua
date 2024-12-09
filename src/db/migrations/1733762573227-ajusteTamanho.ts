import { MigrationInterface, QueryRunner } from "typeorm";

export class AjusteTamanho1733762573227 implements MigrationInterface {
    name = 'AjusteTamanho1733762573227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(500) NOT NULL`);
    }

}
