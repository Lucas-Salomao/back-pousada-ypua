import { IsEnum, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';

export class CreateReservaDTO {
    @IsString()
    codigo: string;

    @IsString()
    usuarioId: string;

    @IsString()
    dataEntrada: string;

    @IsString()
    dataSaida: string;

    @IsEnum(StatusReserva)
    status: StatusReserva;

    @IsNumber()
    valorTotal: number;
}