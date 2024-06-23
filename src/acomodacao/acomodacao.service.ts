import { Injectable } from '@nestjs/common';
import { AcomodacaoEntity } from './acomodacao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';

@Injectable()
export class AcomodacaoService {
    constructor(
        @InjectRepository(AcomodacaoEntity)
        private readonly acomodacaoRepository: Repository<AcomodacaoEntity>
    ) {}

    async createAcomodacao(acomodacaoEntity: AcomodacaoEntity){
        await this.acomodacaoRepository.save(acomodacaoEntity);
    }

    async readAcomodacao(){
        const acomodacoesSalvos = await this.acomodacaoRepository.find();
        return acomodacoesSalvos;
    }

    async updateAcomodacao(id:string, acomodacaoEntity:UpdateAcomodacaoDTO){
        await this.acomodacaoRepository.update(id,acomodacaoEntity);

    }

    async deleteAcomodacao(id:string){
        await this.acomodacaoRepository.delete(id);

    }
}
