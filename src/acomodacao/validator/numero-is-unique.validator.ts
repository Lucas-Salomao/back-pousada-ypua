import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { AcomodacaoRepository } from "../acomodacao.repository";

@Injectable()
@ValidatorConstraint({async:true})
export class NumberIsUniqueValidator implements ValidatorConstraintInterface{
    
    constructor(private acomodacaoRepository:AcomodacaoRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const acomodacaoComNumeroExiste = await this.acomodacaoRepository.existWithNumber(value);
        return !acomodacaoComNumeroExiste;
    }

}

export const NumberIsUnique = (opcoesDeValidacao:ValidationOptions)=>{
    return(objeto: Object, propriedade: string)=>{
        registerDecorator({
            target: objeto.constructor,
            propertyName:propriedade,
            options:opcoesDeValidacao,
            constraints:[],
            validator:NumberIsUniqueValidator
        })
    }
}