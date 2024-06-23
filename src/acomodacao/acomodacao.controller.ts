import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AcomodacaoRepository } from './acomodacao.repository';
import { AcomodacaoService } from './acomodacao.service';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';
import { CreateAcomodacaoDTO } from './dto/CreateAcomodacao.dto';
import { AcomodacaoEntity } from './acomodacao.entity';

@Controller('/acomodacao')
export class AcomodacaoController {

    constructor(
        private acomodacaoRepository: AcomodacaoRepository,
        private acomodacaoService: AcomodacaoService

    ) { }

    @Post()
    async createAcomodacao(@Body() dadosAcomodacao: CreateAcomodacaoDTO) {

        const acomodacaoEntity = new AcomodacaoEntity();
        acomodacaoEntity.id=uuid();
        // Set all properties from the DTO to the entity
        acomodacaoEntity.nome = dadosAcomodacao.nome;
        acomodacaoEntity.numero = dadosAcomodacao.numero;
        acomodacaoEntity.categoria = dadosAcomodacao.categoria;
        acomodacaoEntity.capacidade = dadosAcomodacao.capacidade;
        acomodacaoEntity.quantidadeCamas = dadosAcomodacao.quantidadeCamas;
        acomodacaoEntity.tipoCama = dadosAcomodacao.tipoCama;
        acomodacaoEntity.tipoBanheiro = dadosAcomodacao.tipoBanheiro;
        acomodacaoEntity.comChuveiro = dadosAcomodacao.comChuveiro;
        acomodacaoEntity.comBanheira = dadosAcomodacao.comBanheira;
        acomodacaoEntity.comBide = dadosAcomodacao.comBide;
        acomodacaoEntity.comArCondicionado = dadosAcomodacao.comArCondicionado;
        acomodacaoEntity.comAquecedor = dadosAcomodacao.comAquecedor;
        acomodacaoEntity.comTV = dadosAcomodacao.comTV;
        acomodacaoEntity.tamanhoTV = dadosAcomodacao.tamanhoTV;
        acomodacaoEntity.canaisTV = dadosAcomodacao.canaisTV;
        acomodacaoEntity.comWifi = dadosAcomodacao.comWifi;
        acomodacaoEntity.velocidadeWifi = dadosAcomodacao.velocidadeWifi;
        acomodacaoEntity.wifiPago = dadosAcomodacao.wifiPago;
        acomodacaoEntity.comMiniBar = dadosAcomodacao.comMiniBar;
        acomodacaoEntity.comCofre = dadosAcomodacao.comCofre;
        acomodacaoEntity.comTelefone = dadosAcomodacao.comTelefone;
        acomodacaoEntity.comVaranda = dadosAcomodacao.comVaranda;
        acomodacaoEntity.vista = dadosAcomodacao.vista;
        acomodacaoEntity.preco = dadosAcomodacao.preco;

        this.acomodacaoService.createAcomodacao(acomodacaoEntity);
        return {
            usuario: acomodacaoEntity,
            message: 'usuario criado com sucesso!'
        }
    }

    @Get()
    async readAcomodacao() {
        const acomodacoesSalvos = await this.acomodacaoService.readAcomodacao();
        return acomodacoesSalvos;
    }

    @Put('/:id')
    async updateAcomodacao(@Param('id') id: string, @Body() dadosAcomodacao: UpdateAcomodacaoDTO) {
        const acomodacaoAtualizado = await this.acomodacaoService.updateAcomodacao(id, dadosAcomodacao);

        return {
            usuario: acomodacaoAtualizado,
            message: 'acomodacao atualizada com sucesso!'
        }
    }

    @Delete('/:id')
    async deleteAcomodacao(@Param('id') id: string) {
        const acomodacaoDeleted = await this.acomodacaoService.deleteAcomodacao(id);

        return {
            usuario: acomodacaoDeleted,
            message: 'acomodacao removida com sucesso!'
        }
    }
}
function uuid(): string {
    throw new Error('Function not implemented.');
}

