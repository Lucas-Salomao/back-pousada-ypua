import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostgresConfigService} from './config/postgres.config.service';
import {ConfigModule} from '@nestjs/config';
import { HospedeController } from './hospede/hospede.controller';
import { ReservaController } from './reserva/reserva.controller';
import { ReservaModule } from './reserva/reserva.module';
import { HospedeModule } from './hospede/hospede.module';
import { AcomodacaoModule } from './acomodacao/acomodacao.module';
import { AcomodacaoController } from './acomodacao/acomodacao.controller';


@Module({
  imports: [
    UsuarioModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject:[PostgresConfigService]
    }),
    ReservaModule,
    HospedeModule,
    AcomodacaoModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
