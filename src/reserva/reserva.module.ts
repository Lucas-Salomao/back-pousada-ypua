import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { ReservaEntity } from './reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelCodeGeneratorService } from './hotel-code-generator.service';
import { HospedeEntity } from '../hospede/hospede.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity,HospedeEntity])],
  controllers: [ReservaController],
  providers: [ReservaService,HotelCodeGeneratorService],
})
export class ReservaModule {}
