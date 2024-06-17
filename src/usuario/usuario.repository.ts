import {Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository{
    private usuarios : UsuarioEntity[]=[];

    async saveUsuario(usuario: UsuarioEntity){
        this.usuarios.push(usuario);
    }

    async getUsuario()
    {
        return this.usuarios;
    }

    async existwithEmail(email: string)
    {
        const possivelUsuario=this.usuarios.find(
            usuario=>usuario.email===email
        );

        return possivelUsuario !== undefined;
    }

    async existwithCPF(cpf: string)
    {
        const possivelUsuario=this.usuarios.find(
            usuario=>usuario.cpf===cpf
        );

        return possivelUsuario !== undefined;
    }

    async existwithRG(rg: string)
    {
        const possivelUsuario=this.usuarios.find(
            usuario=>usuario.rg===rg
        );

        return possivelUsuario !== undefined;
    }

    public searchByID(id:string)
    {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo=>usuarioSalvo.id===id
        );

        if(!possivelUsuario)
        {
            throw new Error ('Usuario nao existe');
        }

        return possivelUsuario;
    }

    async updateUsuario(id:string, dadosDeAtualizacao:Partial<UsuarioEntity>)
    {
        const usuario = this.searchByID(id);

        Object.entries(dadosDeAtualizacao).forEach(([chave,valor])=>{
            if(chave==='id')
            {
                return;
            }

            usuario[chave]=valor;
        });
        return usuario;
    }

    async deleteUsuario(id:string)
    {
        const usuario = this.searchByID(id);
        this.usuarios=this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );
        return usuario
    }
}