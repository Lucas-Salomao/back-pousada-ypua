import { IsEnum, IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaFormDataDTO {
    
    @ApiProperty({
        type: String,
        description: 'Id do usuário',
        example: '12345678',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    usuarioId: string;

    @ApiProperty({
        type: String,
        description: 'Data de entrada',
        example: '2021-09-01',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Data de entrada deve ser preenchida'})
    dataEntrada: string;

    @ApiProperty({
        type: String,
        description: 'Data de saída',
        example: '2021-09-05',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Data de saída deve ser preenchida'})
    dataSaida: string;

    @ApiProperty({
        type: Number,
        description: 'Status da reserva',
        example: 'RESERVADO',
        required: true,
    })
    @IsEnum(StatusReserva)
    @IsNotEmpty({message:'Status da reserva deve ser preenchido'})
    status: StatusReserva;

    @ApiProperty({
        type: Number,
        description: 'Quantidade de diárias',
        example: '4',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Valor Total deve ser preenchido'})
    valorTotal: string;

    @ApiProperty({
        type: String,
        description: 'Id da acomodação',
        example: '12345678',
        required: true,
    })
    @IsString()
    @IsNotEmpty({message:'Acomodação deve ser escolhida'})
    acomodacaoId: string;

    @ApiProperty({
        type: String,
        description: 'Id dos hóspedes',
        example: ['12345678'],
        required: true,
    })
    @IsOptional({message:'Hóspedes deve ser preenchido'})
    hospedeIds: string[];
}