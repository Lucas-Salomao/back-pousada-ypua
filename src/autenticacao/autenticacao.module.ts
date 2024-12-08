import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
      UsuarioModule,
      JwtModule.registerAsync({
        useFactory: (ConfigService: ConfigService) =>{
          return{
            secret: ConfigService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '24h' },
          };
        },
        inject: [ConfigService],
        global: true,
      }),
    ],
    controllers: [AutenticacaoController],
    providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
