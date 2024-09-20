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
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    rg: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    cpf: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    rua: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    numero: number;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    complemento: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    bairro: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    cidade: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    estado: string;

    @ApiProperty({
        type: String,
        description: 'Telefone do hóspede',
        example: '999999999',
        required: false,
    })
    @IsOptional()
    pais: string;

}
