import { ReservaEntity } from '../reserva/reserva.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity({name: 'usuarios'})
export class UsuarioEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({name:'nome', length:100, nullable:false})
    nome:string;
    
    @Column({name:'email', length:70, nullable:false})
    email:string;
    
    @Column({name:'senha', length:255, nullable:false})
    senha:string;
    
    @Column({name:'rg', length:12, nullable:false})
    rg:string;
    
    @Column({name:'cpf', length:14, nullable:false})
    cpf:string;
    
    @Column({name:'rua', length:50, nullable:false})
    rua:string;
    
    @Column({name:'numero', type:`int`, nullable:false})
    numero:number;
    
    @Column({name:'complemento', length:30, nullable:true})
    complemento:string;
    
    @Column({name:'bairro', length:30, nullable:false})
    bairro:string;
    
    @Column({name:'cidade', length:30, nullable:false})
    cidade:string;
    
    @Column({name:'estado', length:2, nullable:false})
    estado:string;
    
    @Column({name:'pais', length:20, nullable:false})
    pais:string;
    
    @Column({name:'role', length:20, nullable:false})
    role:string;

    @CreateDateColumn({name:'created_at'})
    createdAt:string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt:string;

    @OneToMany(()=>ReservaEntity,(reserva)=>reserva.usuario)
    reservas:ReservaEntity[]
}