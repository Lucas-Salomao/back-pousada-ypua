import { IsInt, IsString, IsOptional, IsBoolean } from "class-validator";
import { NumberIsUnique } from "../validator/numero-is-unique.validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAcomodacaoDTO {

  @ApiProperty({
    type: String,
    description: 'Id da acomodação',
    example: '12345678',
    required: false,
  })
  @IsOptional()
  @Exclude()
  id?: string;
  
  @ApiProperty({
    type: String,
    description: 'Nome da acomodação',
    example: 'Quarto de Casal',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome: string;

  @ApiProperty({
    type: Number,
    description: 'Número da acomodação',
    example: 101,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @NumberIsUnique({message:'Ja existe uma acomodação com este numero'})
  numero: number;

  @ApiProperty({
    type: String,
    description: 'Categoria da acomodação',
    example: 'Luxo',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoria: string;

  @ApiProperty({
    type: Number,
    description: 'Capacidade da acomodação',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  capacidade: number;

  // Optional Characteristics of Beds
  @ApiProperty({
    type: Number,
    description: 'Quantidade de camas',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  quantidadeCamas: number;

  @ApiProperty({
    type: String,
    description: 'Tipo de cama',
    example: 'Casal',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoCama: string;

  // Optional Characteristics of Bathroom
  @ApiProperty({
    type: String,
    description: 'Tipo de banheiro',
    example: 'Privativo',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoBanheiro: string;

  @ApiProperty({
    type: Boolean,
    description: 'Com chuveiro',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comChuveiro: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com banheira',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comBanheira: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com bidê',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comBide: boolean;

  // Optional Additional Amenities
  @ApiProperty({
    type: Boolean,
    description: 'Com ar condicionado',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comArCondicionado: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com aquecedor',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comAquecedor: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com TV',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comTV: boolean;

  @ApiProperty({
    type: Number,
    description: 'Tamanho da TV',
    example: 32,
    required: false,
  })
  @IsOptional()
  @IsInt()
  tamanhoTV: number;

  @ApiProperty({
    type: String,
    description: 'Canais de TV',
    example: 'Globo, SBT, Record',
    required: false,
  })
  @IsOptional()
  @IsString()
  canaisTV: string;

  @ApiProperty({
    type: Boolean,
    description: 'Com Wi-Fi',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comWifi: boolean;

  @ApiProperty({
    type: String,
    description: 'Velocidade do Wi-Fi',
    example: '100MB',
    required: false,
  })
  @IsOptional()
  @IsString()
  velocidadeWifi: string;

  @ApiProperty({
    type: Boolean,
    description: 'Wi-Fi pago',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  wifiPago: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com frigobar',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comMiniBar: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com cofre',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comCofre: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com telefone',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comTelefone: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com varanda',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  comVaranda: boolean;

  @ApiProperty({
    type: String,
    description: 'Vista da acomodação',
    example: 'Praia',
    required: false,
  })
  @IsOptional()
  @IsString()
  vista: string;

  @ApiProperty({
    type: String,
    description: 'Descrição da acomodação',
    example: 'Quarto de casal com vista para o mar',
    required: false,
  })
  @IsOptional()
  @IsInt()
  preco: number;
}
