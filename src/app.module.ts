import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostgresConfigService} from './config/postgres.config.service';
import {ConfigModule} from '@nestjs/config';


@Module({
  imports: [
    UsuarioModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject:[PostgresConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
