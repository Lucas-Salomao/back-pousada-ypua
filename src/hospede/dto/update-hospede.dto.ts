import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateHospedeDTO {

    @IsOptional()
    @Exclude()
    id?: string;

    @IsString()
    @IsOptional()
    nome: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    rg: string;

    @IsOptional()
    cpf: string;

    @IsOptional()
    rua: string;

    @IsOptional()
    numero: number;

    @IsOptional()
    complemento: string;

    @IsOptional()
    bairro: string;

    @IsOptional()
    cidade: string;

    @IsOptional()
    estado: string;

    @IsOptional()
    pais: string;

}
