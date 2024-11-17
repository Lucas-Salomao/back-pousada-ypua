import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AcomodacaoEntity } from "./acomodacao.entity";

@Entity({ name: 'imagens_acomodacao' })
export class FotosAcomodacaoEntity {
    constructor(partial: Partial<FotosAcomodacaoEntity>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'bytea', nullable: false })
    imagem: Buffer; // Armazena a imagem como buffer binário

    @Column({ nullable: false })
    nome: string; // Nome do arquivo da imagem

    @Column({ nullable: false })
    tipo: string; // Tipo MIME da imagem (ex: "image/jpeg", "image/png")

    @ManyToOne(() => AcomodacaoEntity, (acomodacao) => acomodacao.fotos)
    acomodacao: AcomodacaoEntity;
}