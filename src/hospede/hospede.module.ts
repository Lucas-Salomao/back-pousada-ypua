import { Module } from '@nestjs/common';
import { HospedeService } from './hospede.service';
import { HospedeController } from './hospede.controller';
import { HospedeEntity } from './hospede.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailIsUniqueValidator } from './validator/email-is-unique.validator';
import { CPFIsUniqueValidator } from './validator/cpf-is-unique.validator';
import { RGIsUniqueValidator } from './validator/rg-is-unique.validator';
import { HospedeRepository } from './hospede.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HospedeEntity])],
  controllers: [HospedeController],
  providers: [HospedeService,HospedeRepository,EmailIsUniqueValidator, CPFIsUniqueValidator,RGIsUniqueValidator],
})
export class HospedeModule { }
