import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShowUsuarioDTO } from "./dto/showUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async showUsuario(){
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista=usuariosSalvos.map(
            (usuario)=> new ShowUsuarioDTO(usuario.id,usuario.nome)
        )

        return usuariosLista;
    }
}