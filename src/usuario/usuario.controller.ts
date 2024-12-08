import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUsuarioDTO } from "./dto/CreateUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid'
import { ShowUsuarioDTO } from "./dto/ShowUsuario.dto";
import { UpdateUsuarioDTO } from "./dto/UpdateUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { HashearSenhaPipe } from "../recursos/pipes/hashear-senha.pipe";
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';


@ApiTags('usuario')
@Controller('/usuario')
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService
    ) { }

    @ApiOperation({ summary: 'Cria um novo usuario' })
    @ApiCreatedResponse({ description: 'Retorna o usuario criado', type: ShowUsuarioDTO })
    @ApiUnprocessableEntityResponse({ description: 'Erro de validação' })
    @Post()
    async createUsuario(
        @Body() { senha, ...dadosUsuario }: CreateUsuarioDTO,
        @Body('senha', HashearSenhaPipe) senhaHasheada: string
    ) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.id = uuid();
        usuarioEntity.nome = dadosUsuario.nome;
        usuarioEntity.email = dadosUsuario.email;
        usuarioEntity.senha = senhaHasheada;
        usuarioEntity.cpf = dadosUsuario.cpf;
        usuarioEntity.rg = dadosUsuario.rg;
        usuarioEntity.rua = dadosUsuario.rua;
        usuarioEntity.numero = dadosUsuario.numero;
        usuarioEntity.complemento = dadosUsuario.complemento;
        usuarioEntity.bairro = dadosUsuario.bairro;
        usuarioEntity.cidade = dadosUsuario.cidade;
        usuarioEntity.estado = dadosUsuario.estado;
        usuarioEntity.pais = dadosUsuario.pais;
        usuarioEntity.role = dadosUsuario.role;

        this.usuarioService.createUsuario(usuarioEntity);
        return {
            usuario: new ShowUsuarioDTO(
                usuarioEntity.id,
                usuarioEntity.nome,
                usuarioEntity.email,
                usuarioEntity.rg,
                usuarioEntity.cpf,
                usuarioEntity.rua,
                usuarioEntity.numero,
                usuarioEntity.complemento,
                usuarioEntity.bairro,
                usuarioEntity.cidade,
                usuarioEntity.estado,
                usuarioEntity.pais,
                usuarioEntity.role
            ),
            message: 'usuario criado com sucesso!'
        }
    }

    @ApiOperation({ summary: 'Lista todos os usuarios' })
    @UseGuards(AutenticacaoGuard)
    @Get()
    async readUsuario() {
        const usuariosSalvos = await this.usuarioService.readUsuario();
        return usuariosSalvos;
    }

    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    @UseGuards(AutenticacaoGuard)
    @Get('/:id')
    async findUsuarioById(@Param('id') id: string) {
        const usuario = await this.usuarioService.findById(id);
        return {
            usuario: new ShowUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email,
                usuario.rg,
                usuario.cpf,
                usuario.rua,
                usuario.numero,
                usuario.complemento,
                usuario.bairro,
                usuario.cidade,
                usuario.estado,
                usuario.pais,
                usuario.role
            )
        };
    }

    @ApiOperation({ summary: 'Atualiza um usuario' })
    @UseGuards(AutenticacaoGuard)
    @Put('/:id')
    async updateUsuario(@Param('id') id: string, @Body() dadosUsuario: UpdateUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioService.updateUsuario(id, dadosUsuario);

        return {
            usuario: usuarioAtualizado,
            message: 'usuario atualizado com sucesso!'
        }
    }

    @ApiOperation({ summary: 'Deleta um usuario' })
    @UseGuards(AutenticacaoGuard)
    @Delete('/:id')
    async deleteUsuario(@Param('id') id: string) {
        const usuarioDeleted = await this.usuarioService.deleteUsuario(id);

        return {
            usuario: usuarioDeleted,
            message: 'usuario removido com sucesso!'
        }
    }
}