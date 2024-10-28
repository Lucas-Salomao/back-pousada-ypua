import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoTabelasIniciais1719171877238 implements MigrationInterface {
    name = 'CriandoTabelasIniciais1719171877238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "senha" character varying(255) NOT NULL, "rg" character varying(12) NOT NULL, "cpf" character varying(14) NOT NULL, "rua" character varying(50) NOT NULL, "numero" integer NOT NULL, "complemento" character varying(30), "bairro" character varying(30) NOT NULL, "cidade" character varying(30) NOT NULL, "estado" character varying(2) NOT NULL, "pais" character varying(20) NOT NULL, "role" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hospedes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "rg" character varying(12) NOT NULL, "cpf" character varying(14) NOT NULL, "rua" character varying(50) NOT NULL, "numero" integer NOT NULL, "complemento" character varying(30), "bairro" character varying(30) NOT NULL, "cidade" character varying(30) NOT NULL, "estado" character varying(2) NOT NULL, "pais" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_18d657ecc6e2efa7f1acb2a17c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo" character varying(100) NOT NULL, "status" character varying NOT NULL, "data_entrada" character varying(30) NOT NULL, "data_saida" character varying(30) NOT NULL, "valor_total" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "hospedeId" uuid, CONSTRAINT "PK_309c659053bcf5e56f8e40a2b42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "acomodacoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(20) NOT NULL, "numero" integer NOT NULL, "categoria" character varying(20) NOT NULL, "capacidade" integer NOT NULL, "quantidade_camas" integer NOT NULL, "tipo_cama" character varying(20) NOT NULL, "tipo_banheiro" character varying(20) NOT NULL, "com_chuveiro" boolean NOT NULL, "com_banheira" boolean NOT NULL, "com_bide" boolean NOT NULL, "com_ar_condicionado" boolean NOT NULL, "com_aquecedor" boolean NOT NULL, "com_tv" boolean NOT NULL, "tamanho_tv" integer NOT NULL, "canais_tv" character varying(20), "com_wifi" boolean NOT NULL, "velocidade_wifi" character varying NOT NULL, "wifi_pago" boolean NOT NULL, "com_mini_bar" boolean NOT NULL, "com_cofre" boolean NOT NULL, "com_telefone" boolean NOT NULL, "com_varanda" boolean NOT NULL, "vista" character varying(50) NOT NULL, "preco" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7e1d35fb184f54c94de896c3aae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_9a402b16b963402d1af0aa40279" FOREIGN KEY ("hospedeId") REFERENCES "hospedes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_9a402b16b963402d1af0aa40279"`);
        await queryRunner.query(`DROP TABLE "acomodacoes"`);
        await queryRunner.query(`DROP TABLE "reservas"`);
        await queryRunner.query(`DROP TABLE "hospedes"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
