import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelacionamentos1719198038346 implements MigrationInterface {
    name = 'UpdateRelacionamentos1719198038346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_9a402b16b963402d1af0aa40279"`);
        await queryRunner.query(`ALTER TABLE "reservas" RENAME COLUMN "hospedeId" TO "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_8adfd4e4e0c39ff814a6f9c1841" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_8adfd4e4e0c39ff814a6f9c1841"`);
        await queryRunner.query(`ALTER TABLE "reservas" RENAME COLUMN "usuarioId" TO "hospedeId"`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_9a402b16b963402d1af0aa40279" FOREIGN KEY ("hospedeId") REFERENCES "hospedes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
