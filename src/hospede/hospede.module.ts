import { Module } from '@nestjs/common';
import { HospedeService } from './hospede.service';
import { HospedeController } from './hospede.controller';
import { HospedeEntity } from './hospede.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HospedeEntity])],
  controllers: [HospedeController],
  providers: [HospedeService],
})
export class HospedeModule { }
