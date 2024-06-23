import { Module } from '@nestjs/common';
import { HospedeService } from './hospede.service';

@Module({
  providers: [HospedeService]
})
export class HospedeModule {}
