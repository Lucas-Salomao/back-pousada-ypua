import { Controller, Get } from '@nestjs/common';
import { MapsService } from './maps.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('maps')
@Controller('/maps')
export class MapsController {

  constructor(private readonly mapsService: MapsService) {}

  @ApiOperation({ summary: 'Busca a chave da API do Google Maps' })
  @Get('/google-maps-key')
  async readReserva() {
    const maps = await this.mapsService.readMaps();
    return maps;
  }
}
