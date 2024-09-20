import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { CPFIsUnique } from "../validator/cpf-is-unique.validator";
import { RGIsUnique } from "../validator/rg-is-unique.validator";
import { EmailIsUnique } from "../validator/email-is-unique.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDTO {
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    example: 'João',
    required: true,
  })
  @IsString()
  @IsNotEmpty({message:'Nome deve ser preenchido'})
  nome:string;
  
  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    example: 'usuario@email.com'
  })
  @IsEmail()
  @IsNotEmpty({message:'E-mail deve ser preenchido'})
  @EmailIsUnique({message:'Ja existe um usuario com este e-mail'})
  email:string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: '12345678',
    required: true,
  })
  @MinLength(8, {message:'A senha deve conter 8 caracteres'})
  @IsNotEmpty({message:'A senha deve ser preenchida'})
  senha:string;
  
  @ApiProperty({
    type: String,
    description: 'RG do usuário',
    example: '12345678',
    required: true,
  })
  @IsNotEmpty({message:'RG deve ser preenchido'})
  @RGIsUnique({message:'Ja existe um usuario com este RG'})
  rg:string;

  @ApiProperty({
    type: String,
    description: 'CPF do usuário',
    example: '12345678901',
    required: true,
  })
  @IsNotEmpty({message:'CPF deve ser preenchido'})
  @CPFIsUnique({message:'Ja existe um usuario com este CPF'})
  cpf:string;

  @ApiProperty({
    type: String,
    description: 'Rua do usuário',
    example: 'Rua A',
    required: true,
  })
  @IsNotEmpty({message:'Endereço deve ser preenchido'})
  rua:string;

  @ApiProperty({
    type: Number,
    description: 'Número da casa do usuário',
    example: 123,
    required: true,
  })
  @IsNotEmpty({message:'Número deve ser preenchido'})
  numero:number;

  @ApiProperty({
    type: String,
    description: 'Complemento do endereço do usuário',
    example: 'Casa 1',
    required: false,
  })
  @IsOptional()
  complemento:string;
  
  @ApiProperty({
    type: String,
    description: 'Bairro do usuário',
    example: 'Centro',
    required: true,
  })
  @IsNotEmpty({message:'Bairro deve ser preenchido'})
  bairro:string;

  @ApiProperty({
    type: String,
    description: 'Cidade do usuário',
    example: 'São Paulo',
    required: true,
  })
  @IsNotEmpty({message:'Cidade deve ser preenchido'})
  cidade:string;

  @ApiProperty({
    type: String,
    description: 'Estado do usuário',
    example: 'SP',
    required: true,
  })
  @IsNotEmpty({message:'Estado deve ser preenchido'})
  estado:string;

  @ApiProperty({
    type: String,
    description: 'País do usuário',
    example: 'Brasil',
    required: true,
  })
  @IsNotEmpty({message:'País deve ser preenchido'})
  pais:string;

  @ApiProperty({
    type: String,
    description: 'Função do usuário',
    example: 'admin',
    required: true,
  })
  @IsNotEmpty({message:'Função deve ser preenchido'})
  role:string;
}