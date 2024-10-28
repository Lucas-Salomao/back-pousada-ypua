import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { HospedeRepository } from "../hospede.repository";

@Injectable()
@ValidatorConstraint({async:true})
export class CPFIsUniqueValidator implements ValidatorConstraintInterface{
    
    constructor(private hospedeRepository:HospedeRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const hospedeComCPFExiste = await this.hospedeRepository.existwithCPF(value);
        return !hospedeComCPFExiste;
    }

}

export const CPFIsUnique = (opcoesDeValidacao:ValidationOptions)=>{
    return(objeto: Object, propriedade: string)=>{
        registerDecorator({
            target: objeto.constructor,
            propertyName:propriedade,
            options:opcoesDeValidacao,
            constraints:[],
            validator:CPFIsUniqueValidator
        })
    }
}