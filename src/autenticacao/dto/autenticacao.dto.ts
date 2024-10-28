import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AutenticaDto {
  @IsEmail(undefined, { message: 'Email inválido' })
  email: string;
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  senha: string;
}
