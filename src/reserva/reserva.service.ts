import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { Repository } from 'typeorm';
import { HospedeEntity } from '../hospede/hospede.entity';
import { HotelCodeGeneratorService } from './hotel-code-generator.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UpdateReservaDTO } from './dto/update-reserva.dto';
import { CreateReservaDTO } from './dto/create-reserva.dto';
import { ReservaRepository } from './reserva.repository';
import { CreateReservaFormDataDTO } from './dto/create-reserva-formdata.dto';
import { AcomodacaoEntity } from '../acomodacao/acomodacao.entity';

@Injectable()
export class ReservaService {

  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
    private readonly reservaRepositoryCustom: ReservaRepository,
    @InjectRepository(AcomodacaoEntity)
    private readonly acomodacaoRepository: Repository<AcomodacaoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private readonly hotelCodeGeneratorService: HotelCodeGeneratorService,
    @InjectRepository(HospedeEntity)
    private readonly hospedeRepository: Repository<HospedeEntity>,
  ) { }

  async createReserva(dadosReserva: CreateReservaFormDataDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: dadosReserva.usuarioId })
    const acomodacao = await this.acomodacaoRepository.findOneBy({ id: dadosReserva.acomodacaoId })
    const hospedes = await Promise.all(
      dadosReserva.hospedeIds.map(
        async (hospedeId) =>
          await this.hospedeRepository.findOneBy({ id: hospedeId })
      )
    );
    const reservaEntity = new ReservaEntity();

    reservaEntity.codigo = this.hotelCodeGeneratorService.generateCode();
    reservaEntity.dataEntrada = dadosReserva.dataEntrada;
    reservaEntity.dataSaida = dadosReserva.dataSaida;
    reservaEntity.status = dadosReserva.status;
    reservaEntity.usuario = usuario;
    reservaEntity.valorTotal = Number(dadosReserva.valorTotal);
    reservaEntity.acomodacao=acomodacao;
    reservaEntity.hospedes=hospedes;

    const reservaCriado = await this.reservaRepository.save(reservaEntity);
    return reservaCriado;
  }

  async readReserva() {
    const reservasSalvos = await this.reservaRepository.find({
      relations: ['usuario', 'acomodacao', 'hospedes'], // Inclui as relações na busca
    });
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

  async findReservaByName(nome: string): Promise<ReservaEntity[]> {
    return this.reservaRepositoryCustom.searchByName(nome); 
  }

  async findReservaByCpf(cpf: string): Promise<ReservaEntity[]> {
    return this.reservaRepositoryCustom.searchByCpf(cpf); 
  }
}
