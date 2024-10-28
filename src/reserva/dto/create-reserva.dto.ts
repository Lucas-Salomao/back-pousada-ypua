import { IsEnum, IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';

export class CreateReservaDTO {
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    usuarioId: string;

    @IsString()
    @IsNotEmpty()
    dataEntrada: string;

    @IsString()
    @IsNotEmpty()
    dataSaida: string;

    @IsEnum(StatusReserva)
    @IsNotEmpty()
    status: StatusReserva;

    @IsNumber()
    @IsNotEmpty()
    valorTotal: number;
}