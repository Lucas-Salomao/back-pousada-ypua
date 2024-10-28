import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(nome: string, email: string, telefone:string, mensagem: string) {
    await this.mailerService.sendMail({
      to: 'lucastadeusalomao@gmail.com',
      from: email,
      subject: `'E-mail de Contato - Cliente ${nome}'`,
      html: `<h3 style="color: blue">${mensagem}</h3><br><h3 style="color: red">Entrar em contato pelo telefone ${telefone}</h3>`,
    });
  }
}