import { MigrationInterface, QueryRunner } from "typeorm";

export class AcomodacaoNovosAtributos1720539336334 implements MigrationInterface {
    name = 'AcomodacaoNovosAtributos1720539336334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_bide"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "canais_tv"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "velocidade_wifi"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "wifi_pago"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_mini_bar"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_telefone"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "vista"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_toalhas" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_cozinha" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_frigobar" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "descricao" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_frigobar"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_cozinha"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_toalhas"`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "vista" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_telefone" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_mini_bar" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "wifi_pago" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "velocidade_wifi" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "canais_tv" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_bide" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "categoria" character varying(20) NOT NULL`);
    }

}
