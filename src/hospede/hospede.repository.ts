import { Injectable } from "@nestjs/common";
import { HospedeEntity } from "./hospede.entity";

@Injectable()
export class HospedeRepository {
    private hospedes: HospedeEntity[] = [];

    async createUsuario(hospede: HospedeEntity) {
        const possivelHospede = this.hospedes.push(hospede);

        if (!possivelHospede) {
            throw new Error('Erro ao salvar no banco de dados');
        }
    }

    async readUsuario() {
        return this.hospedes;
    }

    async existwithEmail(email: string) {
        const possivelHospede = this.hospedes.find(
            hospede => hospede.email === email
        );

        return possivelHospede !== undefined;
    }

    async existwithCPF(cpf: string) {
        const possivelHospede = this.hospedes.find(
            hospede => hospede.cpf === cpf
        );

        return possivelHospede !== undefined;
    }

    async existwithRG(rg: string) {
        const possivelHospede = this.hospedes.find(
            hospede => hospede.rg === rg
        );

        return possivelHospede !== undefined;
    }

    async searchByID(id: string) {
        const possivelHospede = this.hospedes.find(
            hospedeSalvo => hospedeSalvo.id === id
        );

        if (!possivelHospede) {
            throw new Error('Hóspede nao existe');
        }

        return possivelHospede;
    }

    async updateUsuario(id: string, dadosDeAtualizacao: Partial<HospedeEntity>) {
        const hospede = this.hospedes.find(
            hospedeSalvo => hospedeSalvo.id === id
        );

        if (!hospede) {
            throw new Error('Hóspede não existe!');
        }

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            hospede[chave] = valor;
        });
        return hospede;
    }

    async deleteUsuario(id: string) {
        const hospede = this.searchByID(id);
        this.hospedes = this.hospedes.filter(
            hospedeSalvo => hospedeSalvo.id !== id
        );
        return hospede
    }
}