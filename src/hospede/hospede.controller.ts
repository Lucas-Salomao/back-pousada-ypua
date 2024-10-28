import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { HospedeService } from './hospede.service';
import { UpdateHospedeDTO } from './dto/update-hospede.dto';
import { CreateHospedeDTO } from './dto/create-hospede.dto';
import { HospedeEntity } from './hospede.entity';
import { v4 as uuid } from 'uuid'
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/hospede')
export class HospedeController {
  constructor(
    private readonly hospedeService: HospedeService
  ) { }

  @Post()
  async createHospede(@Body() dadosHospede: CreateHospedeDTO) {
    const hospedeEntity = new HospedeEntity();
    hospedeEntity.id = uuid();
    hospedeEntity.nome = dadosHospede.nome;
    hospedeEntity.email = dadosHospede.email;
    hospedeEntity.cpf = dadosHospede.cpf;
    hospedeEntity.rg = dadosHospede.rg;
    hospedeEntity.rua = dadosHospede.rua;
    hospedeEntity.numero = dadosHospede.numero;
    hospedeEntity.complemento = dadosHospede.complemento;
    hospedeEntity.bairro = dadosHospede.bairro;
    hospedeEntity.cidade = dadosHospede.cidade;
    hospedeEntity.estado = dadosHospede.estado;
    hospedeEntity.pais = dadosHospede.pais;

    this.hospedeService.createHospede(hospedeEntity);
    return {
      usuario: hospedeEntity,
      message: 'hospede criado com sucesso!'
    }
  }

  @Get()
  async readHospede() {
    const hospedesSalvos = await this.hospedeService.readHospede();
    return hospedesSalvos;
  }

  @Put('/:id')
  async updateHospede(@Param('id') id: string, @Body() dadosHospede: UpdateHospedeDTO) {
    const hospedeAtualizado = await this.hospedeService.updateHospede(id, dadosHospede);

    return {
      usuario: hospedeAtualizado,
      message: 'hospede atualizado com sucesso!'
    }
  }

  @Delete('/:id')
  async deleteHospede(@Param('id') id: string) {
    const hospedeDeleted = await this.hospedeService.deleteHospede(id);

    return {
      usuario: hospedeDeleted,
      message: 'hospede removido com sucesso!'
    }
  }
}
