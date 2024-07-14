import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { HospedeRepository } from "../hospede.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async:true})
export class EmailIsUniqueValidator implements ValidatorConstraintInterface{
    
    constructor(private hospedeRepository:HospedeRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const hospedeComEmailExiste = await this.hospedeRepository.existwithEmail(value);
        return !hospedeComEmailExiste;
    }

}

export const EmailIsUnique = (opcoesDeValidacao:ValidationOptions)=>{
    return(objeto: Object, propriedade: string)=>{
        registerDecorator({
            target: objeto.constructor,
            propertyName:propriedade,
            options:opcoesDeValidacao,
            constraints:[],
            validator:EmailIsUniqueValidator
        })
    }
}