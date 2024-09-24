import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateHospedeDTO {

    @ApiProperty({
        type: String,
        description: 'Id do hóspede',
        example: '12345678',
        required: false,
    })
    @IsOptional()
    @Exclude()
    id?: string;

    @ApiProperty({
        type: String,
        description: 'Nome do hóspede',
        example: 'João da Silva',
        required: false,
    })
    @IsString()
    @IsOptional()
    nome: string;

    @ApiProperty({
        type: String,
        description: 'Email do hóspede',
        example: 'email@email.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        type: String,
        description: 'RG do hóspede',
        example: '12345678',
        required: false,
    })
    @IsOptional()
    rg: string;

    @ApiProperty({
        type: String,
        description: 'CPF do hóspede',
        example: '12345678901',
        required: false,
    })
    @IsOptional()
    cpf: string;

    @ApiProperty({
        type: String,
        description: 'Rua do endereço',
        example: 'Rua das Flores',
        required: false,
    })
    @IsOptional()
    rua: string;

    @ApiProperty({
        type: String,
        description: 'Número da residência',
        example: '999',
        required: false,
    })
    @IsOptional()
    numero: number;

    @ApiProperty({
        type: String,
        description: 'COmplemento do endereço',
        example: 'Casa',
        required: false,
    })
    @IsOptional()
    complemento: string;

    @ApiProperty({
        type: String,
        description: 'Bairro do endereço',
        example: 'Centro',
        required: false,
    })
    @IsOptional()
    bairro: string;

    @ApiProperty({
        type: String,
        description: 'Cidade do hóspede',
        example: 'São Paulo',
        required: false,
    })
    @IsOptional()
    cidade: string;

    @ApiProperty({
        type: String,
        description: 'Estado do hóspede',
        example: 'SP',
        required: false,
    })
    @IsOptional()
    estado: string;

    @ApiProperty({
        type: String,
        description: 'País do hóspede',
        example: 'Brasil',
        required: false,
    })
    @IsOptional()
    pais: string;

}
