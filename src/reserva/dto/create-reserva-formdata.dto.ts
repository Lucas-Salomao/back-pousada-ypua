import { IsEnum, IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';
import { Exclude } from 'class-transformer';

export class CreateReservaFormDataDTO {
    
    @IsString()
    @IsNotEmpty()
    usuarioId: string;

    @IsString()
    @IsNotEmpty({message:'Data de entrada deve ser preenchida'})
    dataEntrada: string;

    @IsString()
    @IsNotEmpty({message:'Data de saída deve ser preenchida'})
    dataSaida: string;

    @IsEnum(StatusReserva)
    @IsNotEmpty({message:'Status da reserva deve ser preenchido'})
    status: StatusReserva;

    @IsString()
    @IsNotEmpty({message:'Valor Total deve ser preenchido'})
    valorTotal: string;

    @IsString()
    @IsNotEmpty({message:'Acomodação deve ser escolhida'})
    acomodacaoId: string;

    @IsOptional({message:'Hóspedes deve ser preenchido'})
    hospedeIds: string[];
}