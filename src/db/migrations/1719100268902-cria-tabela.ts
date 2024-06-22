import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabela1719100268902 implements MigrationInterface {
    name = 'CriaTabela1719100268902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "senha" character varying(255) NOT NULL, "rg" character varying(12) NOT NULL, "cpf" character varying(14) NOT NULL, "rua" character varying(50) NOT NULL, "numero" character varying(5) NOT NULL, "complemento" character varying(30), "bairro" character varying(30) NOT NULL, "cidade" character varying(30) NOT NULL, "estado" character varying(2) NOT NULL, "pais" character varying(20) NOT NULL, "role" character varying(10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
