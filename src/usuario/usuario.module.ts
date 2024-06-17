import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailIsUnique, EmailIsUniqueValidator } from "./validator/email-is-unique.validator";
import { CPFIsUniqueValidator } from "./validator/cpf-is-unique.validator";
import { RGIsUniqueValidator } from "./validator/rg-is-unique.validator";

@Module({
    controllers:[UsuarioController],
    providers:[UsuarioRepository, EmailIsUniqueValidator, CPFIsUniqueValidator,RGIsUniqueValidator]
})
export class UsuarioModule{
}