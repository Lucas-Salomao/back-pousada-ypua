import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservaRepository extends Repository<ReservaEntity> {

    private reservas: ReservaEntity[] = [];

    async searchByCode(codigo: string) {
        const possivelReserva = this.reservas.find(
            reservaSalvo => reservaSalvo.codigo === codigo
        );

        if (!possivelReserva) {
            throw new Error('Reserva nao existe');
        }

        return possivelReserva;
    }

    async searchByName(nome: string): Promise<ReservaEntity[]> {
        return this.createQueryBuilder('reserva')
            .leftJoinAndSelect('reserva.hospedes', 'hospedes')
            .where('hospedes.nome LIKE :nome', { nome: `%${nome}%` })
            .getMany();
    }

    async searchByCpf(cpf: string): Promise<ReservaEntity[]> {
        return this.createQueryBuilder('reserva')
            .leftJoinAndSelect('reserva.hospedes', 'hospedes')
            .where('hospedes.cpf = :cpf', { cpf })
            .getMany();
    }


}
