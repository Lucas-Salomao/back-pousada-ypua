import { IsEnum, IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDTO {
    @ApiProperty({
        type: String,
        description: 'Código da reserva',
        example: '12345678',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    codigo: string;

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
    @IsNotEmpty()
    dataEntrada: string;

    @ApiProperty({
        type: String,
        description: 'Data de saída',
        example: '2021-09-05',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    dataSaida: string;

    @ApiProperty({
        type: Number,
        description: 'Status da reserva',
        example: 'RESERVADO',
        required: true,
    })
    @IsEnum(StatusReserva)
    @IsNotEmpty()
    status: StatusReserva;

    @ApiProperty({
        type: Number,
        description: 'Valor total',
        example: 1000,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    valorTotal: number;
}