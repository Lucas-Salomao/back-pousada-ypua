import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDTO } from './dto/create-reserva.dto';
import { UpdateReservaDTO } from './dto/update-reserva.dto';
import { ReservaEntity } from './reserva.entity';
import { CreateReservaFormDataDTO } from './dto/create-reserva-formdata.dto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Post()
  async createReserva(@Body() createReservaFormDataDTO: CreateReservaFormDataDTO) {
    const reservaCriada = await this.reservaService.createReserva(
      createReservaFormDataDTO, // Passe o CreateReservaDTO inteiro para o service
    );
    return reservaCriada;
  }

  @Get()
  async readReserva() {
    const reservasSalvos = await this.reservaService.readReserva();
    return reservasSalvos;
  }

  @Put('/:id')
  async updateReserva(@Param('id') id: string, @Body() dadosReserva: UpdateReservaDTO) {
    const reservaAtualizado = await this.reservaService.updateReserva(id, dadosReserva);

    return {
      usuario: reservaAtualizado,
      message: 'reserva atualizada com sucesso!'
    }
  }

  @Delete('/:id')
  async deleteReserva(@Param('id') id: string) {
    const reservaDeleted = await this.reservaService.deleteReserva(id);

    return {
      usuario: reservaDeleted,
      message: 'reserva removida com sucesso!'
    }
  }

  @Get('nome/:nome')
  async findReservaByName(@Param('nome') nome: string): Promise<ReservaEntity[]> {
    const reservas = await this.reservaService.findReservaByName(nome);
    return reservas;
  }

  @Get('cpf/:cpf')
  async findReservaByCpf(@Param('cpf') cpf: string): Promise<ReservaEntity[]> {
    const reservas = await this.reservaService.findReservaByCpf(cpf);
    return reservas;
  }
}
