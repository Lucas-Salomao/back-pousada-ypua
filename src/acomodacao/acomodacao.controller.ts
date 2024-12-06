import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, Req, HttpException, HttpStatus, NotFoundException, UploadedFiles, UseGuards } from '@nestjs/common';
import { AcomodacaoRepository } from './acomodacao.repository';
import { AcomodacaoService } from './acomodacao.service';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';
import { CreateAcomodacaoDTO } from './dto/CreateAcomodacao.dto';
import { AcomodacaoEntity } from './acomodacao.entity';
import { v4 as uuid } from 'uuid';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FotosAcomodacaoEntity } from './fotos.acomodacao.entity';
import { CreateAcomodacaoFormDataDTO } from './dto/CreateAcomodacaoFormData.dto';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@ApiTags('acomodacao')
@Controller('/acomodacao')
export class AcomodacaoController {

    constructor(
        private acomodacaoService: AcomodacaoService
    ) { }

    @ApiOperation({ summary: 'Cria uma nova acomodação' })
    @UseGuards(AutenticacaoGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('fotos')) // Permita múltiplos arquivos no campo 'fotos'
    //async createAcomodacao(@Req() dadosAcomodacao: any, @UploadedFiles() fotos: Array<Express.Multer.File>): Promise<any> {
    async createAcomodacao(@Body() dadosAcomodacao:CreateAcomodacaoFormDataDTO, @UploadedFiles() fotos: Array<Express.Multer.File>): Promise<any> {
        //console.log(dadosAcomodacao);
        const acomodacaoEntity = new AcomodacaoEntity();
        acomodacaoEntity.id = uuid();

        acomodacaoEntity.nome=dadosAcomodacao.nome;
        acomodacaoEntity.numero=Number(dadosAcomodacao.numero);
        acomodacaoEntity.capacidade=Number(dadosAcomodacao.capacidade);
        acomodacaoEntity.quantidadeCamas=Number(dadosAcomodacao.quantidadeCamas);
        acomodacaoEntity.tipoCama=dadosAcomodacao.tipoCama;
        acomodacaoEntity.tipoBanheiro=dadosAcomodacao.tipoBanheiro;
        acomodacaoEntity.comChuveiro=Boolean(dadosAcomodacao.comChuveiro);
        acomodacaoEntity.comBanheira=Boolean(dadosAcomodacao.comBanheira);
        acomodacaoEntity.comToalhas=Boolean(dadosAcomodacao.comToalhas);
        acomodacaoEntity.comSecador=Boolean(dadosAcomodacao.comSecador);
        acomodacaoEntity.comAcessibilidade=Boolean(dadosAcomodacao.comAcessibilidade);
        acomodacaoEntity.comCozinha=Boolean(dadosAcomodacao.comCozinha);
        acomodacaoEntity.comRestaurante=Boolean(dadosAcomodacao.comRestaurante);
        acomodacaoEntity.comArCondicionado=Boolean(dadosAcomodacao.comArCondicionado);
        acomodacaoEntity.comAquecedor=Boolean(dadosAcomodacao.comAquecedor);
        acomodacaoEntity.comTV=Boolean(dadosAcomodacao.comTV);
        acomodacaoEntity.tamanhoTV=Number(dadosAcomodacao.tamanhoTV);
        acomodacaoEntity.comWifi=Boolean(dadosAcomodacao.comWifi);
        acomodacaoEntity.comFrigobar=Boolean(dadosAcomodacao.comFrigobar);
        acomodacaoEntity.comCofre=Boolean(dadosAcomodacao.comCofre);
        acomodacaoEntity.comVaranda=Boolean(dadosAcomodacao.comVaranda);
        acomodacaoEntity.descricao=dadosAcomodacao.descricao;
        acomodacaoEntity.preco=Number(dadosAcomodacao.preco);

        // Crie as entidades de fotos e associe à acomodação
        acomodacaoEntity.fotos = fotos.map(foto => {
            const fotoEntity = new FotosAcomodacaoEntity({});
            fotoEntity.nome = foto.originalname;
            fotoEntity.tipo = foto.mimetype;
            fotoEntity.imagem = foto.buffer; // Salve o buffer da imagem
            return fotoEntity;
        });

        await this.acomodacaoService.createAcomodacao(acomodacaoEntity);
        return {
            acomodacao: acomodacaoEntity,
            message: 'acomodação criada com sucesso!',
        };
    }

    @ApiOperation({ summary: 'Lista todas as acomodações' })
    @Get()
    async readAcomodacao() {
        const acomodacoesSalvos = await this.acomodacaoService.readAcomodacao();
        return acomodacoesSalvos;
    }

    @ApiOperation({ summary: 'Busca uma acomodação pelo id' })
    @Put('/:id')
    async updateAcomodacao(@Param('id') id: string, @Body() dadosAcomodacao: UpdateAcomodacaoDTO) {
        const acomodacaoAtualizado = await this.acomodacaoService.updateAcomodacao(id, dadosAcomodacao);

        return {
            usuario: acomodacaoAtualizado,
            message: 'acomodacao atualizada com sucesso!'
        }
    }

    @ApiOperation({ summary: 'Deleta uma acomodação' })
    @UseGuards(AutenticacaoGuard)
    @Delete('/:id')
    async deleteAcomodacao(@Param('id') id: string) {
        const acomodacaoDeleted = await this.acomodacaoService.deleteAcomodacao(id);

        return {
            usuario: acomodacaoDeleted,
            message: 'acomodacao removida com sucesso!'
        }
    }
}

