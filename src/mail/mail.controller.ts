import { Controller, Post, Req } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('/email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Envia um email' })
  @Post('sendemail')
  enviarEmail(@Req() req) {
    return this.mailService.sendEmail(req.body.nome, req.body.email, req.body.telefone, req.body.mensagem);
  }
}
