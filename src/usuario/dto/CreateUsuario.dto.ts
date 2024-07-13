import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional} from "class-validator";
import { EmailIsUnique } from "../validator/email-is-unique.validator";
import { RGIsUnique } from "../validator/rg-is-unique.validator";

export class CreateUsuarioDTO{
    @IsString()
    @IsNotEmpty()
    nome:string;
    
    @IsEmail()
    @IsNotEmpty()
    @EmailIsUnique({message:'Ja existe um usuario com este e-mail'})
    email:string;

    @MinLength(8, {message:'A senha deve conter 8 caracteres'})
    @IsNotEmpty()
    senha:string;
    
    @IsNotEmpty()
    @RGIsUnique({message:'Ja existe um usuario com este RG'})
    rg:string;

    @IsNotEmpty()
    @RGIsUnique({message:'Ja existe um usuario com este CPF'})
    cpf:string;

    @IsNotEmpty()
    rua:string;

    @IsNotEmpty()
    numero:number;

    @IsOptional()
    complemento:string;
    
    @IsNotEmpty()
    bairro:string;

    @IsNotEmpty()
    cidade:string;

    @IsNotEmpty()
    estado:string;

    @IsNotEmpty()
    pais:string;

    @IsNotEmpty()
    role:string;
}