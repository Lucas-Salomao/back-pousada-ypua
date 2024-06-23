import { Module } from '@nestjs/common';
import { AcomodacaoService } from './acomodacao.service';
import { AcomodacaoEntity } from './acomodacao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcomodacaoController } from './acomodacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AcomodacaoEntity])],
  controllers:[AcomodacaoController],
  providers: [AcomodacaoService, AcomodacaoEntity]
})
export class AcomodacaoModule {}
