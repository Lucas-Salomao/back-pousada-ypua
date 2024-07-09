import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AcomodacaoEntity } from './acomodacao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';
import { FotosAcomodacaoEntity } from './fotos.acomodacao.entity';

@Injectable()
export class AcomodacaoService {
    constructor(
        @InjectRepository(AcomodacaoEntity)
        private readonly acomodacaoRepository: Repository<AcomodacaoEntity>,
        @InjectRepository(FotosAcomodacaoEntity)
        private readonly fotosAcomodacaoRepository: Repository<FotosAcomodacaoEntity>,
    ) { }

    async createAcomodacao(acomodacaoEntity: AcomodacaoEntity): Promise<AcomodacaoEntity> {
        return await this.acomodacaoRepository.save(acomodacaoEntity);
    }

    async readAcomodacao() {
        const acomodacoesSalvos = await this.acomodacaoRepository.find({ relations: ['fotos'] });
        return acomodacoesSalvos;
    }

    async updateAcomodacao(id: string, acomodacaoEntity: UpdateAcomodacaoDTO) {
        await this.acomodacaoRepository.update(id, acomodacaoEntity);

    }

    // async deleteAcomodacao(id: string) {
    //     await this.acomodacaoRepository.delete(id);

    // }

    async deleteAcomodacao(id: string): Promise<void> {
        // Verifica se existem imagens associadas à acomodação
        const imagensAcomodacao = await this.fotosAcomodacaoRepository.find({
            where: { acomodacao: { id } },
        });

        // Se existirem imagens, exclua-as primeiro
        if (imagensAcomodacao.length > 0) {
            await this.fotosAcomodacaoRepository.delete(imagensAcomodacao.map(imagem => imagem.id));
        }

        // Exclui a acomodação
        await this.acomodacaoRepository.delete(id);
    }


    async createFoto(acomodacaoId: string, imagem: Buffer, nome: string, tipo: string): Promise<FotosAcomodacaoEntity> {
        // Usando findOneOrFail para buscar a acomodação e lançar um erro caso não encontre
        const acomodacao = await this.acomodacaoRepository.findOneOrFail({
            where: { id: acomodacaoId }
        });

        const foto = this.fotosAcomodacaoRepository.create({
            imagem,
            nome,
            tipo,
            acomodacao,
        });

        return await this.fotosAcomodacaoRepository.save(foto);
    }
}
