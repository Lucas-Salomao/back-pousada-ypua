import { IsInt, IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";
import { NumberIsUnique } from "../validator/numero-is-unique.validator";

export class CreateAcomodacaoDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsNotEmpty()
  @NumberIsUnique({message:'Ja existe uma acomodação com este numero'})
  numero: number;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsInt()
  @IsNotEmpty()
  capacidade: number;

  // Características das Camas
  @IsInt()
  @IsNotEmpty()
  quantidadeCamas: number;

  @IsString()
  @IsNotEmpty()
  tipoCama: string;

  // Características do Banheiro
  @IsString()
  @IsNotEmpty()
  tipoBanheiro: string;

  @IsBoolean()
  @IsNotEmpty()
  comChuveiro: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comBanheira: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comBide: boolean;

  // Comodidades Adicionais
  @IsBoolean()
  @IsNotEmpty()
  comArCondicionado: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comAquecedor: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comTV: boolean;

  @IsInt()
  @IsNotEmpty()
  tamanhoTV: number;

  @IsOptional()
  @IsString()
  canaisTV: string;

  @IsBoolean()
  @IsNotEmpty()
  comWifi: boolean;

  @IsString()
  @IsNotEmpty()
  velocidadeWifi: string;

  @IsBoolean()
  @IsNotEmpty()
  wifiPago: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comMiniBar: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comCofre: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comTelefone: boolean;

  @IsBoolean()
  @IsNotEmpty()
  comVaranda: boolean;

  @IsString()
  @IsNotEmpty()
  vista: string;

  @IsInt()
  @IsNotEmpty()
  preco: number;
}
