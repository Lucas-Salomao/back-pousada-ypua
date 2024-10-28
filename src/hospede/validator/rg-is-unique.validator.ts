import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { HospedeRepository } from "../hospede.repository";

@Injectable()
@ValidatorConstraint({async:true})
export class RGIsUniqueValidator implements ValidatorConstraintInterface{
    
    constructor(private hospedeRepository:HospedeRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const hospedeComRGExiste = await this.hospedeRepository.existwithRG(value);
        return !hospedeComRGExiste;
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