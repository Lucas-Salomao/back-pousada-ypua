import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservaRepository extends Repository<ReservaEntity> {

    private reservas: ReservaEntity[] = [];

    public searchByCode(codigo: string) {
        const possivelReserva = this.reservas.find(
            reservaSalvo => reservaSalvo.codigo === codigo
        );

        if (!possivelReserva) {
            throw new Error('Reserva nao existe');
        }

        return possivelReserva;
    }
}
