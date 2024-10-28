import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async:true})
export class RGIsUniqueValidator implements ValidatorConstraintInterface{
    
    constructor(private usuarioRepository:UsuarioRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComRGExiste = await this.usuarioRepository.existwithRG(value);
        return !usuarioComRGExiste;
    }

}

export const RGIsUnique = (opcoesDeValidacao:ValidationOptions)=>{
    return(objeto: Object, propriedade: string)=>{
        registerDecorator({
            target: objeto.constructor,
            propertyName:propriedade,
            options:opcoesDeValidacao,
            constraints:[],
            validator:RGIsUniqueValidator
        })
    }
}