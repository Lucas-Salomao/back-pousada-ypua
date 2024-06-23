import { Injectable } from '@nestjs/common';
import { CreateHospedeDto } from './dto/create-hospede.dto';
import { UpdateHospedeDto } from './dto/update-hospede.dto';

@Injectable()
export class HospedeService {
  create(createHospedeDto: CreateHospedeDto) {
    return 'This action adds a new hospede';
  }

  findAll() {
    return `This action returns all hospede`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospede`;
  }

  update(id: number, updateHospedeDto: UpdateHospedeDto) {
    return `This action updates a #${id} hospede`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospede`;
  }
}
