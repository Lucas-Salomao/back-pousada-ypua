import { Controller, Post, Req } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('/email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendemail')
  enviarEmail(@Req() req) {
    return this.mailService.sendEmail(req.body.nome, req.body.email, req.body.telefone, req.body.mensagem);
  }
}
