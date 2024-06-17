import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional} from "class-validator";
import { EmailIsUnique } from "../validator/email-is-unique.validator";
import { RGIsUnique } from "../validator/rg-is-unique.validator";

export class UpdateUsuarioDTO{
    @IsString()
    @IsOptional()
    nome:string;
    
    @IsEmail()
    @IsOptional()
    @EmailIsUnique({message:'Ja existe um usuario com este e-mail'})
    email:string;

    @MinLength(8)
    @IsOptional()
    senha:string;
    
    @IsOptional()
    @RGIsUnique({message:'Ja existe um usuario com este RG'})
    rg:string;

    @IsOptional()
    @RGIsUnique({message:'Ja existe um usuario com este CPF'})
    cpf:string;

    @IsOptional()
    rua:string;

    @IsOptional()
    numero:string;
    
    @IsOptional()
    complemento:string;
    
    @IsOptional()
    bairro:string;

    @IsOptional()
    cidade:string;

    @IsOptional()
    estado:string;

    @IsOptional()
    pais:string;

    @IsOptional()
    role:string;
}