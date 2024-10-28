import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelacionamentos290620241719667850584 implements MigrationInterface {
    name = 'UpdateRelacionamentos290620241719667850584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospedes" ADD "reservaId" uuid`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD "acomodacaoId" uuid`);
        await queryRunner.query(`ALTER TABLE "hospedes" ADD CONSTRAINT "FK_97c6b4e52c2d84a607db7d851cf" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_f1b3549fffc2f256b47c5f9dfd1" FOREIGN KEY ("acomodacaoId") REFERENCES "acomodacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_f1b3549fffc2f256b47c5f9dfd1"`);
        await queryRunner.query(`ALTER TABLE "hospedes" DROP CONSTRAINT "FK_97c6b4e52c2d84a607db7d851cf"`);
        await queryRunner.query(`ALTER TABLE "reservas" DROP COLUMN "acomodacaoId"`);
        await queryRunner.query(`ALTER TABLE "hospedes" DROP COLUMN "reservaId"`);
    }

}
