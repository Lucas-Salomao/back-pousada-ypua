import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelaAcomodacao1719155502377 implements MigrationInterface {
    name = 'CriaTabelaAcomodacao1719155502377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "acomodacoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(20) NOT NULL, "numero" integer NOT NULL, "categoria" character varying(20) NOT NULL, "capacidade" integer NOT NULL, "quantidade_camas" integer NOT NULL, "tipo_cama" character varying(20) NOT NULL, "tipo_banheiro" character varying(20) NOT NULL, "com_chuveiro" boolean NOT NULL, "com_banheira" boolean NOT NULL, "com_bide" boolean NOT NULL, "com_ar_condicionado" boolean NOT NULL, "com_aquecedor" boolean NOT NULL, "com_tv" boolean NOT NULL, "tamanho_tv" integer NOT NULL, "canais_tv" character varying(20), "com_wifi" boolean NOT NULL, "velocidade_wifi" character varying NOT NULL, "wifi_pago" boolean NOT NULL, "com_mini_bar" boolean NOT NULL, "com_cofre" boolean NOT NULL, "com_telefone" boolean NOT NULL, "com_varanda" boolean NOT NULL, "vista" character varying(50) NOT NULL, "preco" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7e1d35fb184f54c94de896c3aae" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "acomodacoes"`);
    }

}
