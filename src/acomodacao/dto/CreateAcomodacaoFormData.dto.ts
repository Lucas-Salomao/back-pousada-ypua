import { IsInt, IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray } from "class-validator";

export class CreateAcomodacaoFormDataDTO {
    @IsString()
    @IsNotEmpty({message:'Nome deve ser preenchido'})
    nome: string;

    @IsString()
    @IsNotEmpty({message:'Número deve ser preenchido'})
    numero: string;

    //   @IsString()
    //   @IsNotEmpty()
    //   categoria: string;

    @IsString()
    @IsNotEmpty({message:'Capacidade deve ser preenchido'})
    capacidade: string;

    // Características das Camas
    @IsString()
    @IsNotEmpty({message:'Quantidade deve ser preenchido'})
    quantidadeCamas: string;

    @IsString()
    @IsNotEmpty({message:'Tipo de cama deve ser preenchido'})
    tipoCama: string;

    // Características do Banheiro
    @IsString()
    @IsNotEmpty({message:'Tipo de banheiro deve ser preenchido'})
    tipoBanheiro: string;

    @IsString()
    @IsNotEmpty()
    comChuveiro: string;

    @IsString()
    @IsNotEmpty()
    comBanheira: string;

    //   @IsString()
    //   @IsNotEmpty()
    //   comBide: string;

    @IsString()
    @IsNotEmpty()
    comToalhas: string;

    @IsString()
    @IsNotEmpty()
    comSecador: string;

    @IsString()
    @IsNotEmpty()
    comAcessibilidade: string;

    @IsString()
    @IsNotEmpty()
    comCozinha: string;

    @IsString()
    @IsNotEmpty()
    comRestaurante: string;

    // Comodidades Adicionais
    @IsString()
    @IsNotEmpty()
    comArCondicionado: string;

    @IsString()
    @IsNotEmpty()
    comAquecedor: string;

    @IsString()
    @IsNotEmpty()
    comTV: string;

    @IsString()
    @IsNotEmpty({message:'Tamnho da TV deve ser preenchido'})
    tamanhoTV: string;

    // @IsOptional()
    // @IsString()
    // canaisTV: string;

    @IsString()
    @IsNotEmpty()
    comWifi: string;

    // @IsString()
    // @IsNotEmpty()
    // velocidadeWifi: string;

    // @IsString()
    // @IsNotEmpty()
    // wifiPago: string;

    @IsString()
    @IsNotEmpty()
    comFrigobar: string;

    @IsString()
    @IsNotEmpty()
    comCofre: string;

    // @IsString()
    // @IsNotEmpty()
    // comTelefone: string;

    @IsString()
    @IsNotEmpty()
    comVaranda: string;

    @IsString()
    @IsNotEmpty({message:'Descrição deve ser preenchido'})
    descricao: string;

    @IsString()
    @IsNotEmpty({message:'Preço deve ser preenchido'})
    preco: string;
}
