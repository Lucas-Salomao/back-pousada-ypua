import { ApiProperty } from "@nestjs/swagger";
export class ShowUsuarioDTO {
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
        description: 'Role do usuário',
        example: 'user',
        required: true,
    })
    readonly role: string;

    constructor(id: string, nome: string, email: string, rg: string, cpf: string, role: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.rg = rg;
        this.cpf = cpf;
        this.role = role;
    }
}