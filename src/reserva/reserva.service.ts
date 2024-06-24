import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { Repository } from 'typeorm';
import { HospedeEntity } from 'src/hospede/hospede.entity';
import { HotelCodeGeneratorService } from './hotel-code-generator.service';
import { StatusReserva } from './enum/StatusReserva.enum';

@Injectable()
export class ReservaService {

  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
    @InjectRepository(HospedeEntity)
    private readonly hospedeRepository: Repository<HospedeEntity>,
    private readonly hotelCodeGeneratorService: HotelCodeGeneratorService
  ) { }

  async createReserva(hospedeId:string){
    const hospede = await this.hospedeRepository.findOneBy({id:hospedeId})
    const reservaEntity = new ReservaEntity();

    reservaEntity.codigo=this.hotelCodeGeneratorService.generateCode();
    reservaEntity.dataEntrada='23/06/2024';
    reservaEntity.dataSaida='27/06/2024';
    reservaEntity.status=StatusReserva.EM_PROCESSAMENTO;
    reservaEntity.hospede=hospede;

    const reservaCriado=await this.hospedeRepository.save(reservaEntity);
    return reservaCriado;
  }
}
