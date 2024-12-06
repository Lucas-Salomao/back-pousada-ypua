import { IsInt, IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, IsCurrency } from "class-validator";
import { NumberIsUnique } from "../validator/numero-is-unique.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAcomodacaoDTO {

  @ApiProperty({
    type: String,
    description: 'Nome da acomodação',
    example: 'Quarto de Casal',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    type: Number,
    description: 'Número da acomodação',
    example: 101,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  @NumberIsUnique({message:'Ja existe uma acomodação com este numero'})
  numero: number;

  // @IsString()
  // @IsNotEmpty()
  // categoria: string;

  @ApiProperty({
    type: Number,
    description: 'Capacidade da acomodação',
    example: 2,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  capacidade: number;

  // Características das Camas
  @ApiProperty({
    type: Number,
    description: 'Quantidade de camas',
    example: 1,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  quantidadeCamas: number;

  @ApiProperty({
    type: String,
    description: 'Tipo de cama',
    example: 'Casal',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tipoCama: string;

  // Características do Banheiro
  @ApiProperty({
    type: String,
    description: 'Tipo de banheiro',
    example: 'Privativo',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tipoBanheiro: string;

  @ApiProperty({
    type: Boolean,
    description: 'Com chuveiro',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comChuveiro: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com banheira',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comBanheira: boolean;

  // @IsBoolean()
  // @IsNotEmpty()
  // comBide: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com toalhas',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comToalhas: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com secador',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comSecador: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com acessibilidade',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comAcessibilidade: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com cozinha',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comCozinha: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com restaurante',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comRestaurante: boolean;

  // Comodidades Adicionais
  @ApiProperty({
    type: Boolean,
    description: 'Com ar condicionado',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comArCondicionado: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com aquecedor',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comAquecedor: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com TV',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comTV: boolean;

  @ApiProperty({
    type: Number,
    description: 'Tamanho da TV',
    example: 32,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  tamanhoTV: number;

  // @IsOptional()
  // @IsString()
  // canaisTV: string;

  @ApiProperty({
    type: Boolean,
    description: 'Com wifi',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comWifi: boolean;

  // @IsString()
  // @IsNotEmpty()
  // velocidadeWifi: string;

  // @IsBoolean()
  // @IsNotEmpty()
  // wifiPago: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com frigobar',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comFrigobar: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com cofre',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comCofre: boolean;

  // @IsBoolean()
  // @IsNotEmpty()
  // comTelefone: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Com varanda',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comVaranda: boolean;

  @ApiProperty({
    type: String,
    description: 'Descrição da acomodação',
    example: 'Quarto de casal com cama de casal, banheiro privativo, ar condicionado, TV, wifi, frigobar e varanda',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    type: Number,
    description: 'Preço da acomodação',
    example: 150.00,
    required: true,
  })
  @IsCurrency()
  @IsNotEmpty()
  preco: number;

  @ApiProperty({
    type: Array,
    description: 'Fotos da acomodação',
    required: true,
  })
  @IsArray()
  fotos: { nome: string; tipo: string; imagem: Buffer }[]; // Ajuste o tipo de acordo com seus dados
  
}
