import { Controller, Get } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('/maps')
export class MapsController {

    constructor(private readonly mapsService: MapsService) { }
  @Get('/google-maps-key')
  async readReserva() {
    const maps = await this.mapsService.readMaps();
    return maps;
  }
}
