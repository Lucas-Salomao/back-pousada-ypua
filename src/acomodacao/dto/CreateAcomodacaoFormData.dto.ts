import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray } from "class-validator";

export class CreateAcomodacaoFormDataDTO {

    @ApiProperty({
        type: String,
        description: 'Nome da acomodação',
        example: 'Quarto de Casal',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Nome deve ser preenchido'})
    nome: string;

    @ApiProperty({
        type: String,
        description: 'Número da acomodação',
        example: '101',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Número deve ser preenchido'})
    numero: string;

    //   @IsString()
    //   @IsNotEmpty()
    //   categoria: string;

    @ApiProperty({
        type: String,
        description: 'Capacidade da acomodação',
        example: '2',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Capacidade deve ser preenchido'})
    capacidade: string;

    // Características das Camas
    @ApiProperty({
        type: String,
        description: 'Quantidade de camas',
        example: '1',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Quantidade deve ser preenchido'})
    quantidadeCamas: string;

    @ApiProperty({
        type: String,
        description: 'Tipo de cama',
        example: 'Casal',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Tipo de cama deve ser preenchido'})
    tipoCama: string;

    // Características do Banheiro
    @ApiProperty({
        type: String,
        description: 'Tipo de banheiro',
        example: 'Privativo',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Tipo de banheiro deve ser preenchido'})
    tipoBanheiro: string;

    @ApiProperty({
        type: String,
        description: 'Com chuveiro',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comChuveiro: string;

    @ApiProperty({
        type: String,
        description: 'Com banheira',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comBanheira: string;

    //   @IsString()
    //   @IsNotEmpty()
    //   comBide: string;

    @ApiProperty({
        type: String,
        description: 'Com toalhas',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comToalhas: string;

    @ApiProperty({
        type: String,
        description: 'Com secador',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comSecador: string;

    @ApiProperty({
        type: String,
        description: 'Com acessibilidade',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comAcessibilidade: string;

    @ApiProperty({
        type: String,
        description: 'Comodidades Básicas',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comCozinha: string;

    @ApiProperty({
        type: String,
        description: 'Comodidades Básicas',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comRestaurante: string;

    // Comodidades Adicionais
    @ApiProperty({
        type: String,
        description: 'Com ar condicionado',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comArCondicionado: string;

    @ApiProperty({
        type: String,
        description: 'Com aquecedor',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comAquecedor: string;

    @ApiProperty({
        type: String,
        description: 'Com TV',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comTV: string;

    @ApiProperty({
        type: String,
        description: 'Tamanho da TV',
        example: '32 polegadas',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Tamnho da TV deve ser preenchido'})
    tamanhoTV: string;

    // @IsOptional()
    // @IsString()
    // canaisTV: string;

    @ApiProperty({
        type: String,
        description: 'Com Wi-Fi',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comWifi: string;

    // @IsString()
    // @IsNotEmpty()
    // velocidadeWifi: string;

    // @IsString()
    // @IsNotEmpty()
    // wifiPago: string;

    @ApiProperty({
        type: String,
        description: 'Com frigobar',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comFrigobar: string;

    @ApiProperty({
        type: String,
        description: 'Com cofre',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comCofre: string;

    // @IsString()
    // @IsNotEmpty()
    // comTelefone: string;

    @ApiProperty({
        type: String,
        description: 'Com varanda',
        example: 'Sim',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    comVaranda: string;

    @ApiProperty({
        type: String,
        description: 'Descrição da acomodação',
        example: 'Quarto de casal com vista para o mar',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Descrição deve ser preenchido'})
    descricao: string;

    @ApiProperty({
        type: String,
        description: 'Preço da acomodação',
        example: '1000',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Preço deve ser preenchido'})
    preco: string;
}
