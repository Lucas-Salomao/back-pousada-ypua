import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDTO } from './dto/create-reserva.dto';
import { UpdateReservaDTO } from './dto/update-reserva.dto';
import { ReservaEntity } from './reserva.entity';
import { CreateReservaFormDataDTO } from './dto/create-reserva-formdata.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@ApiTags('reserva')
@Controller('/reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @ApiOperation({ summary: 'Criar uma nova reserva' })
  @Post()
  async createReserva(@Body() createReservaFormDataDTO: CreateReservaFormDataDTO) {
    const reservaCriada = await this.reservaService.createReserva(
      createReservaFormDataDTO, // Passe o CreateReservaDTO inteiro para o service
    );
    return reservaCriada;
  }

  @ApiOperation({ summary: 'Listar todas as reservas' })
  @UseGuards(AutenticacaoGuard)
  @Get()
  async readReserva() {
    const reservasSalvos = await this.reservaService.readReserva();
    return reservasSalvos;
  }

  @ApiOperation({ summary: 'Atualizar uma reserva' })
  @UseGuards(AutenticacaoGuard)
  @Put('/:id')
  async updateReserva(@Param('id') id: string, @Body() dadosReserva: UpdateReservaDTO) {
    const reservaAtualizado = await this.reservaService.updateReserva(id, dadosReserva);

    return {
      usuario: reservaAtualizado,
      message: 'reserva atualizada com sucesso!'
    }
  }

  @ApiOperation({ summary: 'Deleta uma reserva' })
  @UseGuards(AutenticacaoGuard)
  @Delete('/:id')
  async deleteReserva(@Param('id') id: string) {
    const reservaDeleted = await this.reservaService.deleteReserva(id);

    return {
      usuario: reservaDeleted,
      message: 'reserva removida com sucesso!'
    }
  }

  @ApiOperation({ summary: 'Buscar uma reserva pelo nome' })
  @UseGuards(AutenticacaoGuard)
  @Get('nome/:nome')
  async findReservaByName(@Param('nome') nome: string): Promise<ReservaEntity[]> {
    const reservas = await this.reservaService.findReservaByName(nome);
    return reservas;
  }

  @ApiOperation({ summary: 'Buscar uma reserva pelo cpf' })
  @UseGuards(AutenticacaoGuard)
  @Get('cpf/:cpf')
  async findReservaByCpf(@Param('cpf') cpf: string): Promise<ReservaEntity[]> {
    const reservas = await this.reservaService.findReservaByCpf(cpf);
    return reservas;
  }
}
