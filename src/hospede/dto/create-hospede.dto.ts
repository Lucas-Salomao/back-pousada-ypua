import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmailIsUnique } from '../validator/email-is-unique.validator';
import { CPFIsUnique } from '../validator/cpf-is-unique.validator';
import { RGIsUnique } from '../validator/rg-is-unique.validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateHospedeDTO {

    @ApiProperty({
        type: String,
        description: 'Nome do hospede',
        example: 'João da Silva',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Nome deve ser preenchido'})
    nome: string;

    @ApiProperty({
        type: String,
        description: 'Email do hospede',
        example: 'email@email.com',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @EmailIsUnique({message:'Ja existe um usuario com este e-mail'})
    email: string;

    @ApiProperty({
        type: String,
        description: 'RG do hospede',
        example: '12345678',
        required: true,
    })
    @IsNotEmpty()
    @RGIsUnique({message:'Ja existe um usuario com este RG'})
    rg: string;

    @ApiProperty({
        type: String,
        description: 'CPF do hospede',
        example: '12345678901',
        required: true,
    })
    @IsNotEmpty()
    @CPFIsUnique({message:'Ja existe um usuario com este CPF'})
    cpf: string;

    @ApiProperty({
        type: String,
        description: 'Rua do endereço',
        example: 'Rua das Flores',
        required: true,
    })
    @IsNotEmpty({message:'Endereço deve ser preenchido'})
    rua: string;

    @ApiProperty({
        type: String,
        description: 'Número da residência',
        example: '999',
        required: true,
    })
    @IsNotEmpty({message:'Número deve ser preenchido'})
    numero: number;

    @ApiProperty({
        type: String,
        description: 'Complemento do endereço',
        example: 'Casa 1',
        required: false,
    })
    @IsOptional()
    complemento: string;

    @ApiProperty({
        type: String,
        description: 'Bairro do endereço',
        example: 'Centro',
        required: true,
    })
    @IsNotEmpty({message:'Bairro deve ser preenchido'})
    bairro: string;

    @ApiProperty({
        type: String,
        description: 'Cidade do hospede',
        example: 'São Paulo',
        required: true,
    })
    @IsNotEmpty({message:'Cidade deve ser preenchido'})
    cidade: string;

    @ApiProperty({
        type: String,
        description: 'Estado do hospede',
        example: 'SP',
        required: true,
    })
    @IsNotEmpty({message:'Estado deve ser preenchido'})
    estado: string;

    @ApiProperty({
        type: String,
        description: 'País do hospede',
        example: 'Brasil',
        required: true,
    })
    @IsNotEmpty({message:'País deve ser preenchido'})
    pais: string;
}
