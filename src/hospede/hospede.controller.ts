import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HospedeService } from './hospede.service';
import { UpdateHospedeDTO } from './dto/update-hospede.dto';
import { CreateHospedeDTO } from './dto/create-hospede.dto';
import { HospedeEntity } from './hospede.entity';
import { v4 as uuid } from 'uuid'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('hospede')
@Controller('/hospede')
export class HospedeController {
  constructor(
    private readonly hospedeService: HospedeService
  ) { }

  @ApiOperation({ summary: 'Cria um novo hospede' })
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

  @ApiOperation({ summary: 'Lista todos os hospedes' })
  @Get()
  async readHospede() {
    const hospedesSalvos = await this.hospedeService.readHospede();
    return hospedesSalvos;
  }

  @ApiOperation({ summary: 'Atualiza um hospede' })
  @Put('/:id')
  async updateHospede(@Param('id') id: string, @Body() dadosHospede: UpdateHospedeDTO) {
    const hospedeAtualizado = await this.hospedeService.updateHospede(id, dadosHospede);

    return {
      usuario: hospedeAtualizado,
      message: 'hospede atualizado com sucesso!'
    }
  }

  @ApiOperation({ summary: 'Deleta um hospede' })
  @Delete('/:id')
  async deleteHospede(@Param('id') id: string) {
    const hospedeDeleted = await this.hospedeService.deleteHospede(id);

    return {
      usuario: hospedeDeleted,
      message: 'hospede removido com sucesso!'
    }
  }
}
