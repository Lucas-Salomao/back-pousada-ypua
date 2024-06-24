import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHospedeDTO {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    rg: string;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    rua: string;

    @IsNotEmpty()
    numero: number;

    @IsOptional()
    complemento: string;

    @IsNotEmpty()
    bairro: string;

    @IsNotEmpty()
    cidade: string;

    @IsNotEmpty()
    estado: string;

    @IsNotEmpty()
    pais: string;
}
