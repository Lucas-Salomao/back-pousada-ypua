import { IsInt, IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray } from "class-validator";

export class CreateAcomodacaoFormDataDTO {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    numero: string;

    //   @IsString()
    //   @IsNotEmpty()
    //   categoria: string;

    @IsString()
    @IsNotEmpty()
    capacidade: string;

    // Características das Camas
    @IsString()
    @IsNotEmpty()
    quantidadeCamas: string;

    @IsString()
    @IsNotEmpty()
    tipoCama: string;

    // Características do Banheiro
    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    preco: string;
}
