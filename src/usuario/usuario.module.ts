import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailIsUniqueValidator } from "./validator/email-is-unique.validator";
import { CPFIsUniqueValidator } from "./validator/cpf-is-unique.validator";
import { RGIsUniqueValidator } from "./validator/rg-is-unique.validator";
import { UsuarioService } from "./usuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers:[UsuarioController],
    providers:[UsuarioService, UsuarioRepository, EmailIsUniqueValidator, CPFIsUniqueValidator,RGIsUniqueValidator]
})
export class UsuarioModule{
}