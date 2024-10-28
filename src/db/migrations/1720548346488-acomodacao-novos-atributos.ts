import { MigrationInterface, QueryRunner } from "typeorm";

export class AcomodacaoNovosAtributos1720548346488 implements MigrationInterface {
    name = 'AcomodacaoNovosAtributos1720548346488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" ADD "com_restaurante" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acomodacoes" DROP COLUMN "com_restaurante"`);
    }

}
