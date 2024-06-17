import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { CreateUsuarioDTO } from "./dto/createUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid} from 'uuid'
import { ShowUsuarioDTO } from "./dto/showUsuario.dto";
import { UpdateUsuarioDTO } from "./dto/updateUsuario.dto";

@Controller('/usuarios')
export class UsuarioController{

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async createUsuario(@Body() dadosUsuario:CreateUsuarioDTO)
    {
        const usuarioEntity = new UsuarioEntity();
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

        this.usuarioRepository.saveUsuario(usuarioEntity);
        return {
            usuario: new ShowUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message:'usuario criado com sucesso!'
        }
    }

    @Get()
    async getUsuario(){
        const usuariosSalvos = await this.usuarioRepository.getUsuario();
        const usuariosLista = usuariosSalvos.map(
            usuario=> new ShowUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        return usuariosLista;
    }

    @Put('/:id')
    async updateUsuario(@Param('id') id:string, @Body() dadosUsuario:UpdateUsuarioDTO)
    {
        const usuarioAtualizado=await this.usuarioRepository.updateUsuario(id, dadosUsuario);

        return {
            usuario: new ShowUsuarioDTO(usuarioAtualizado.id, usuarioAtualizado.nome),
            message:'usuario atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async deleteUsuario(@Param('id') id: string)
    {
        const usuarioDeleted = await this.usuarioRepository.deleteUsuario(id);

        return{
            usuario: new ShowUsuarioDTO(usuarioDeleted.id, usuarioDeleted.nome),
            message:'usuario removido com sucesso!'
        }
    }
}