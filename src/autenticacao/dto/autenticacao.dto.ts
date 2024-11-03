import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AutenticaDto {
  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    example: 'email@email.com',
    required: true,
  })
  @IsEmail(undefined, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: '12345678',
    required: true,
  })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  senha: string;
}
