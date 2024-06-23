import { Module } from '@nestjs/common';
import { HospedeService } from './hospede.service';
import { HospedeController } from './hospede.controller';

@Module({
  controllers: [HospedeController],
  providers: [HospedeService],
})
export class HospedeModule {}
