import { ApiProperty } from "@nestjs/swagger";

export class ShowUsuarioDTO {
    constructor(
        id: string, 
        nome: string, 
        email: string, 
        rg: string, 
        cpf: string, 
        rua: string, 
        numero: number, 
        complemento: string, 
        bairro: string, 
        cidade: string, 
        estado: string, 
        pais: string,
        role: string
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.rg = rg;
        this.cpf = cpf;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.role = role;
    }
    
    @ApiProperty({
        type: String,
        description: 'Id do usuário',
        example: '1',
        required: true,
    })
    readonly id: string;

    @ApiProperty({
        type: String,
        description: 'Nome do usuário',
        example: 'João',
        required: true,
    })
    readonly nome: string;

    @ApiProperty({
        type: String,
        description: 'Email do usuário',
        example: 'usuario@email.com',
        required: true,
    })
    readonly email: string;

    @ApiProperty({
        type: String,
        description: 'RG do usuário',
        example: '123456789',
        required: true,
    })
    readonly rg: string;

    @ApiProperty({
        type: String,
        description: 'CPF do usuário',
        example: '12345678900',
        required: true,
    })
    readonly cpf: string;

    @ApiProperty({
        type: String,
        description: 'Rua do endereço do usuário',
        example: 'Rua das Flores',
        required: true,
    })
    readonly rua: string;

    @ApiProperty({
        type: Number,
        description: 'Número do endereço do usuário',
        example: 123,
        required: true,
    })
    readonly numero: number;

    @ApiProperty({
        type: String,
        description: 'Complemento do endereço do usuário',
        example: 'Apto 101',
        required: false,
    })
    readonly complemento: string;

    @ApiProperty({
        type: String,
        description: 'Bairro do endereço do usuário',
        example: 'Centro',
        required: true,
    })
    readonly bairro: string;

    @ApiProperty({
        type: String,
        description: 'Cidade do endereço do usuário',
        example: 'São Paulo',
        required: true,
    })
    readonly cidade: string;

    @ApiProperty({
        type: String,
        description: 'Estado do endereço do usuário',
        example: 'SP',
        required: true,
    })
    readonly estado: string;

    @ApiProperty({
        type: String,
        description: 'País do endereço do usuário',
        example: 'Brasil',
        required: true,
    })
    readonly pais: string;

    @ApiProperty({
        type: String,
        description: 'Role do usuário',
        example: 'user',
        required: true,
    })
    readonly role: string;
}