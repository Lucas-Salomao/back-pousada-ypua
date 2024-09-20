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
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @EmailIsUnique({message:'Ja existe um usuario com este e-mail'})
    email: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty()
    @RGIsUnique({message:'Ja existe um usuario com este RG'})
    rg: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty()
    @CPFIsUnique({message:'Ja existe um usuario com este CPF'})
    cpf: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty({message:'Endereço deve ser preenchido'})
    rua: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty({message:'Número deve ser preenchido'})
    numero: number;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    complemento: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty({message:'Bairro deve ser preenchido'})
    bairro: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty({message:'Cidade deve ser preenchido'})
    cidade: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty({message:'Estado deve ser preenchido'})
    estado: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hospede',
        example: '999999999',
        required: true,
    })
    @IsNotEmpty({message:'País deve ser preenchido'})
    pais: string;
}
