import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('/reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async createReserva(
    @Query('hospedeId')hospedeId:string,
  ){
    const reservaCriada = await this.reservaService.createReserva(
      hospedeId
    )
    return reservaCriada;
  }
}
