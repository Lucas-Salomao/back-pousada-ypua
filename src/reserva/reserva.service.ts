import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { Repository } from 'typeorm';
import { HospedeEntity } from 'src/hospede/hospede.entity';
import { HotelCodeGeneratorService } from './hotel-code-generator.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UpdateReservaDTO } from './dto/update-reserva.dto';
import { ReservaRepository } from './reserva.repository';

@Injectable()
export class ReservaService {

  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
    @InjectRepository(HospedeEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private readonly hotelCodeGeneratorService: HotelCodeGeneratorService,
    private reservasRepository: ReservaRepository,
  ) { }

  async createReserva(usuarioId: string, dadosReserva: ReservaEntity) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId })
    const reservaEntity = new ReservaEntity();

    reservaEntity.codigo = this.hotelCodeGeneratorService.generateCode();
    reservaEntity.dataEntrada = dadosReserva.dataEntrada;
    reservaEntity.dataSaida = dadosReserva.dataSaida
    reservaEntity.status = dadosReserva.status;
    reservaEntity.usuario = usuario;
    reservaEntity.valorTotal = dadosReserva.valorTotal;

    console.log(reservaEntity);

    const reservaCriado = await this.reservaRepository.save(reservaEntity);
    return reservaCriado;
  }

  async readReserva() {
    const reservasSalvos = await this.reservaRepository.find();
    return reservasSalvos;
  }

  async readReservaByCode(codigo: string) {
    const reserva = await this.reservaRepository.findOneBy({ codigo });
    return reserva;
  }

  async updateReserva(id: string, hospedeEntity: UpdateReservaDTO) {
    await this.reservaRepository.update(id, hospedeEntity);

  }

  async updateReservaByCode(codigo: string, updateReservaDTO: UpdateReservaDTO) {
    const reserva = await this.reservaRepository.findOneBy({ codigo });
    if (!reserva) {
      throw new Error(`Reserva com código ${codigo} não encontrada`);
    }

    // Use o método update do TypeORM para atualizar os campos da reserva
    await this.reservaRepository.update(reserva.id, updateReservaDTO);

    // Retorne a reserva atualizada
    return await this.reservaRepository.findOneBy({ codigo });
  }

  async deleteReserva(id: string) {
    await this.reservaRepository.delete(id);

  }

  async deleteReservaByCode(codigo: string) {
    const reserva = await this.reservaRepository.findOneBy({ codigo });

    if (!reserva) {
      throw new Error(`Reserva com código ${codigo} não encontrada`);
    }

    // Exclua a reserva do banco de dados
    await this.reservaRepository.delete(reserva.id);
  }
}
