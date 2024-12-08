import { Injectable } from '@nestjs/common';
import { CreateHospedeDTO } from './dto/create-hospede.dto';
import { UpdateHospedeDTO } from './dto/update-hospede.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HospedeEntity } from './hospede.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HospedeService {
    constructor(
        @InjectRepository(HospedeEntity)
        private readonly hospedeRepository: Repository<HospedeEntity>
    ) { }

    async createHospede(hospedeEntity: HospedeEntity) {
        await this.hospedeRepository.save(hospedeEntity);
    }

    async readHospede() {
        const hospedesSalvos = await this.hospedeRepository.find();
        return hospedesSalvos;
    }

    async updateHospede(id: string, hospedeEntity: UpdateHospedeDTO) {
        await this.hospedeRepository.update(id, hospedeEntity);

    }

    async deleteHospede(id: string) {
        await this.hospedeRepository.delete(id);

    }

    async findByCPF(cpf: string) {
        const hospede = await this.hospedeRepository.findOne({
            where: { cpf }
        });
        return hospede;
    }

    async findByEmail(email: string): Promise<HospedeEntity | undefined> {
        return this.hospedeRepository.findOne({ where: { email } });
      }
}
