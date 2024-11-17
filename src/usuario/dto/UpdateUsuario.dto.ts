import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional} from "class-validator";
import { EmailIsUnique } from "../validator/email-is-unique.validator";
import { RGIsUnique } from "../validator/rg-is-unique.validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsuarioDTO{
    
    @ApiProperty({
        type: String,
        description: 'Nome do usuário',
        example: '1',
        required: true,
    })
    @IsOptional()
    @Exclude()
    id?: string;
    
    @ApiProperty({
        type: String,
        description: 'Nome do usuário',
        example: 'João',
        required: true,
    })
    @IsString()
    @IsOptional()
    nome:string;
    
    @ApiProperty({
        type: String,
        description: 'Email do usuário',
        example: 'usuario@email.com'
    })  
    @IsEmail()
    @IsOptional()
    @EmailIsUnique({message:'Ja existe um usuario com este e-mail'})
    email:string;

    @ApiProperty({
        type: String,
        description: 'Senha do usuário',
        example: '12345678',
        required: true,
    })
    @MinLength(8)
    @IsOptional()
    senha:string;
    
    @ApiProperty({
        type: String,
        description: 'RG do usuário',
        example: '12345678',
        required: true,
    })
    @IsOptional()
    @RGIsUnique({message:'Ja existe um usuario com este RG'})
    rg:string;

    @ApiProperty({
        type: String,
        description: 'CPF do usuário',
        example: '12345678901',
        required: true,
    })
    @IsOptional()
    @RGIsUnique({message:'Ja existe um usuario com este CPF'})
    cpf:string;

    @ApiProperty({
        type: String,
        description: 'Rua do usuário',
        example: 'Rua A',
        required: true,
    })
    @IsOptional()
    rua:string;

    @ApiProperty({
        type: Number,
        description: 'Número do usuário',
        example: 123,
        required: true,
    })
    @IsOptional()
    numero:number;
    
    @ApiProperty({
        type: String,
        description: 'Complemento do usuário',
        example: 'Casa',
        required: false,
    })
    @IsOptional()
    complemento:string;
    
    @ApiProperty({
        type: String,
        description: 'Bairro do usuário',
        example: 'Centro',
        required: false,
    })
    @IsOptional()
    bairro:string;

    @ApiProperty({
        type: String,
        description: 'Cidade do usuário',
        example: 'São Paulo',
        required: false,
    })
    @IsOptional()
    cidade:string;

    @ApiProperty({
        type: String,
        description: 'Estado do usuário',
        example: 'SP',
        required: false,
    })
    @IsOptional()
    estado:string;

    @ApiProperty({
        type: String,
        description: 'Pais do usuário',
        example: 'Brasil',
        required: false,
    })
    @IsOptional()
    pais:string;

    @ApiProperty({
        type: String,
        description: 'Role do usuário',
        example: 'admin',
        required: false,
    })
    @IsOptional()
    role:string;
}