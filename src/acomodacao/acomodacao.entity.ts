import { ReservaEntity } from "../reserva/reserva.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FotosAcomodacaoEntity } from "./fotos.acomodacao.entity";

@Entity({ name: 'acomodacoes' })
export class AcomodacaoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Características Gerais
    @Column({ name: 'nome', length: 20, nullable: false })
    nome: string;

    @Column({ name: 'numero', nullable: false, type: 'int' })
    numero: number;

    // @Column({ name: 'categoria', length: 20, nullable: false })
    // categoria: string;

    @Column({ name: 'capacidade', nullable: false, type: 'int' })
    capacidade: number;

    // Características das Camas
    @Column({ name: "quantidade_camas", nullable: false, type: 'int'})
    quantidadeCamas: number;

    @Column({ name: "tipo_cama", length: 20, nullable: false })
    tipoCama: string; // Ex: "cama de casal", "solteiro", "king size"

    // Características do Banheiro
    @Column({ name: "tipo_banheiro", length: 20, nullable: false })
    tipoBanheiro: string; // Ex: "privativo", "compartilhado"

    @Column({ name: "com_chuveiro", nullable: false })
    comChuveiro: boolean;

    @Column({ name: "com_banheira", nullable: false })
    comBanheira: boolean;

    // @Column({ name: "com_bide", nullable: false })
    // comBide: boolean;

    @Column({ name: "com_toalhas", nullable: false })
    comToalhas: boolean;

    @Column({ name: "com_secador", nullable: false })
    comSecador: boolean;

    @Column({ name: "com_acessibilidade", nullable: false })
    comAcessibilidade: boolean;

    @Column({ name: "com_cozinha", nullable: false })
    comCozinha: boolean;

    @Column({ name: "com_restaurante", nullable: false })
    comRestaurante: boolean;

    // Comodidades Adicionais
    @Column({ name: "com_ar_condicionado", nullable: false })
    comArCondicionado: boolean;

    @Column({ name: "com_aquecedor", nullable: false })
    comAquecedor: boolean;

    @Column({ name: "com_tv", nullable: false })
    comTV: boolean;

    @Column({ name: "tamanho_tv", nullable: false, type: 'int'})
    tamanhoTV: number; // Em polegadas

    // @Column({ name: "canais_tv", length: 20, nullable: true })
    // canaisTV: string; // Canais disponíveis (opcional)

    @Column({ name: "com_wifi", nullable: false })
    comWifi: boolean;

    // @Column({ name: "velocidade_wifi", nullable: false })
    // velocidadeWifi: string; // Ex: "100mbps", "500mbps"

    // @Column({ name: "wifi_pago", nullable: false })
    // wifiPago: boolean;

    @Column({ name: "com_frigobar", nullable: false })
    comFrigobar: boolean;

    @Column({ name: "com_cofre", nullable: false })
    comCofre: boolean;

    // @Column({ name: "com_telefone", nullable: false })
    // comTelefone: boolean;

    @Column({ name: "com_varanda", nullable: false })
    comVaranda: boolean;

    @Column({ name: "descricao", length: 500, nullable: false })
    descricao: string; // Descrição da vista

    @Column({ name: "preco", nullable: false, type: 'float'})
    preco: number;

    @CreateDateColumn({name:'created_at'})
    createdAt:string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt:string;

    @OneToMany(() => ReservaEntity, reserva => reserva.acomodacao)
    reservas: ReservaEntity[];

    @OneToMany(() => FotosAcomodacaoEntity, (foto) => foto.acomodacao, { cascade: true })
    fotos: FotosAcomodacaoEntity[];

}