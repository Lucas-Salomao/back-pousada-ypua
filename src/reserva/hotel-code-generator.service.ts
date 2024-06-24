import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelCodeGeneratorService {

  private readonly chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  generateCode(length: number = 10): string {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += this.chars[Math.floor(Math.random() * this.chars.length)];
    }
    return code;
  }
}
