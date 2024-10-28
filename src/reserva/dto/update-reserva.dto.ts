import { IsEnum, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';

export class UpdateReservaDTO {

    @IsOptional()
    codigo: string;

    @IsOptional()
    usuarioId: string;

    @IsOptional()
    dataEntrada: string;

    @IsOptional()
    dataSaida: string;

    @IsOptional()
    @IsEnum(StatusReserva)
    status: StatusReserva;

    @IsOptional()
    valorTotal: number;
}
