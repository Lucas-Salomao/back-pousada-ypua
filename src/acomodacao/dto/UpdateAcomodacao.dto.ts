import { IsInt, IsString, IsOptional, IsBoolean } from "class-validator";
import { NumberIsUnique } from "../validator/numero-is-unique.validator";
import { Exclude } from "class-transformer";

export class UpdateAcomodacaoDTO {
  @IsOptional()
  @Exclude()
  id?: string;
  
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsInt()
  @NumberIsUnique({message:'Ja existe uma acomodação com este numero'})
  numero: number;

  @IsOptional()
  @IsString()
  categoria: string;

  @IsOptional()
  @IsInt()
  capacidade: number;

  // Optional Characteristics of Beds
  @IsOptional()
  @IsInt()
  quantidadeCamas: number;

  @IsOptional()
  @IsString()
  tipoCama: string;

  // Optional Characteristics of Bathroom
  @IsOptional()
  @IsString()
  tipoBanheiro: string;

  @IsOptional()
  @IsBoolean()
  comChuveiro: boolean;

  @IsOptional()
  @IsBoolean()
  comBanheira: boolean;

  @IsOptional()
  @IsBoolean()
  comBide: boolean;

  // Optional Additional Amenities
  @IsOptional()
  @IsBoolean()
  comArCondicionado: boolean;

  @IsOptional()
  @IsBoolean()
  comAquecedor: boolean;

  @IsOptional()
  @IsBoolean()
  comTV: boolean;

  @IsOptional()
  @IsInt()
  tamanhoTV: number;

  @IsOptional()
  @IsString()
  canaisTV: string;

  @IsOptional()
  @IsBoolean()
  comWifi: boolean;

  @IsOptional()
  @IsString()
  velocidadeWifi: string;

  @IsOptional()
  @IsBoolean()
  wifiPago: boolean;

  @IsOptional()
  @IsBoolean()
  comMiniBar: boolean;

  @IsOptional()
  @IsBoolean()
  comCofre: boolean;

  @IsOptional()
  @IsBoolean()
  comTelefone: boolean;

  @IsOptional()
  @IsBoolean()
  comVaranda: boolean;

  @IsOptional()
  @IsString()
  vista: string;

  @IsOptional()
  @IsInt()
  preco: number;
}
