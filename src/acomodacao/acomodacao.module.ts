import { Module } from '@nestjs/common';
import { AcomodacaoService } from './acomodacao.service';

@Module({
  providers: [AcomodacaoService]
})
export class AcomodacaoModule {}
