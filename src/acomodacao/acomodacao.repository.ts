import { Injectable } from "@nestjs/common";
import { AcomodacaoEntity } from "./acomodacao.entity";

@Injectable()
export class AcomodacaoRepository{

    private acomodacoes:AcomodacaoEntity[]=[];

    async existWithNumber (numero:number) {
        const possivelAcomodacao=this.acomodacoes.find(
            acomodacao=>acomodacao.numero===numero
        );

        return possivelAcomodacao!==undefined;
    }

    async createAcomodacao(acomodacao:AcomodacaoEntity){
        const possivelAcomodacao=this.acomodacoes.push(acomodacao);

        if (!possivelAcomodacao) {
            throw new Error('Erro ao salvar no banco de dados');
        }
    }

    async readAcomodacao() {
        return this.acomodacoes;
    }

    public searchByID(id: string) {
        const possivelAcomodacao = this.acomodacoes.find(
            acomodacaoSalvo => acomodacaoSalvo.id === id
        );

        if (!possivelAcomodacao) {
            throw new Error('Acomodação nao existe');
        }

        return possivelAcomodacao;
    }

    async updateAcomodacao(id: string, dadosDeAtualizacao: Partial<AcomodacaoEntity>) {
        const acomodacao = this.acomodacoes.find(
            acomodacaoSalvo => acomodacaoSalvo.id === id
        );

        if (!acomodacao) {
            throw new Error('Acomodação não existe!');
        }

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            acomodacao[chave] = valor;
        });
        return acomodacao;
    }

    async deleteAcomodacao(id: string) {
        const acomodacao = this.searchByID(id);
        this.acomodacoes = this.acomodacoes.filter(
            acomodacaoSalvo => acomodacaoSalvo.id !== id
        );
        return acomodacao
    }
}