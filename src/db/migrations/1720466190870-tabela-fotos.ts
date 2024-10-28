import { MigrationInterface, QueryRunner } from "typeorm";

export class TabelaFotos1720466190870 implements MigrationInterface {
    name = 'TabelaFotos1720466190870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "imagens_acomodacao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imagem" bytea NOT NULL, "nome" character varying NOT NULL, "tipo" character varying NOT NULL, "acomodacaoId" uuid, CONSTRAINT "PK_504e918bc9cb2bcdb4c0c31748d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "imagens_acomodacao" ADD CONSTRAINT "FK_bee236b11f822998573a0f42264" FOREIGN KEY ("acomodacaoId") REFERENCES "acomodacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagens_acomodacao" DROP CONSTRAINT "FK_bee236b11f822998573a0f42264"`);
        await queryRunner.query(`DROP TABLE "imagens_acomodacao"`);
    }

}
