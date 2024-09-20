import { Injectable } from "@nestjs/common"
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm"
import {ConfigService} from '@nestjs/config';
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return{
            type: 'postgres',
            host: this.configService.get<string>('DATABASE_HOST'),
            port: this.configService.get<number>('DATABASE_PORT'),
            username: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: this.configService.get<string>('DATABASE_NAME'),
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            synchronize:false
        }
    }
}