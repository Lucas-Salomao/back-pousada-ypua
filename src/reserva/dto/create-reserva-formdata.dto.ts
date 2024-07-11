import { IsEnum, IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';
import { Exclude } from 'class-transformer';

export class CreateReservaFormDataDTO {
    
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

    @IsString()
    @IsNotEmpty()
    valorTotal: string;

    @IsString()
    @IsNotEmpty()
    acomodacaoId: string;

    @IsOptional()
    hospedeIds: string[];
}