import { Injectable } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common/interfaces/features/pipe-transform.interface";
import { ConfigService } from "@nestjs/config/dist/config.service";
import * as bcrypt from 'bcrypt';

@Injectable()

export class HashearSenhaPipe implements PipeTransform {
  constructor(private configService: ConfigService) { }

  async transform(senha: string) {
    const salt = Number(this.configService.get<string>('SALT_PASSWORD'));

    const senhaHasheada = await bcrypt.hash(senha, salt);

    return senhaHasheada;
  }
}