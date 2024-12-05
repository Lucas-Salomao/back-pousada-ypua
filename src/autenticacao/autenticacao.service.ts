import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  userId: string;
  nome: string;
  email:string;
  role: string;
}


@Injectable()
export class AutenticacaoService {
    
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  
  ) {}

  async login(email:string, senhaInserida:string ) {
      const usuario = await this.usuarioService.buscaPorEmail(email);

      const usuarioAutenicado = await bcrypt.compare(
        senhaInserida,
        usuario.senha
      )

      if(!usuarioAutenicado){
        throw new UnauthorizedException('Email ou senha incorretos');
      }

      const payload: UsuarioPayload = {
        userId: usuario.id,
        nome: usuario.nome,
        email:usuario.email,
        role:usuario.role,
      };
      
      return {
        token_acesso: await this.jwtService.signAsync(payload),
      }
  }
}
