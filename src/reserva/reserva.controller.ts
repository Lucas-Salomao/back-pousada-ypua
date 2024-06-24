import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDTO } from './dto/create-reserva.dto';
import { UpdateReservaDTO } from './dto/update-reserva.dto';
import { ReservaEntity } from './reserva.entity';

@Controller('/reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Post()
  async createReserva(@Body() createReservaDTO: CreateReservaDTO) {
    const reservaCriada = await this.reservaService.createReserva(
      createReservaDTO.usuarioId, // Extraia o usuarioId do corpo da requisição
      createReservaDTO, // Passe o CreateReservaDTO inteiro para o service
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
}
