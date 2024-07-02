import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { CreateUsuarioDTO } from "./dto/createUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid} from 'uuid'
import { ShowUsuarioDTO } from "./dto/showUsuario.dto";
import { UpdateUsuarioDTO } from "./dto/updateUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuario')
export class UsuarioController{

    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService

    ) {}

    @Post()
    async createUsuario(@Body() dadosUsuario:CreateUsuarioDTO)
    {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.id=uuid();
        usuarioEntity.nome=dadosUsuario.nome;
        usuarioEntity.email=dadosUsuario.email;
        usuarioEntity.senha=dadosUsuario.senha;
        usuarioEntity.cpf=dadosUsuario.cpf;
        usuarioEntity.rg=dadosUsuario.rg;
        usuarioEntity.rua=dadosUsuario.rua;
        usuarioEntity.numero=dadosUsuario.numero;
        usuarioEntity.complemento=dadosUsuario.complemento;
        usuarioEntity.bairro=dadosUsuario.bairro;
        usuarioEntity.cidade=dadosUsuario.cidade;
        usuarioEntity.estado=dadosUsuario.estado;
        usuarioEntity.pais=dadosUsuario.pais;
        usuarioEntity.role=dadosUsuario.role;

        this.usuarioService.createUsuario(usuarioEntity);
        return {
            usuario: new ShowUsuarioDTO(usuarioEntity.id, usuarioEntity.nome,usuarioEntity.email,usuarioEntity.rg,usuarioEntity.cpf,usuarioEntity.role),
            message:'usuario criado com sucesso!'
        }
    }

    @Get()
    async readUsuario(){
        const usuariosSalvos=await this.usuarioService.readUsuario();        
        return usuariosSalvos;
    }

    @Put('/:id')
    async updateUsuario(@Param('id') id:string, @Body() dadosUsuario:UpdateUsuarioDTO)
    {
        const usuarioAtualizado=await this.usuarioService.updateUsuario(id, dadosUsuario);

        return {
            usuario: usuarioAtualizado,
            message:'usuario atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async deleteUsuario(@Param('id') id: string)
    {
        const usuarioDeleted = await this.usuarioService.deleteUsuario(id);

        return{
            usuario: usuarioDeleted,
            message:'usuario removido com sucesso!'
        }
    }
}