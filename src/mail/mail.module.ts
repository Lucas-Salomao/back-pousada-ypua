import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org', //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: {
          //dados do usuário e senha
          user: "postmaster@sandbox024d2b9e3e974f87b2926f6bacfe5efd.mailgun.org",
          pass: "4ce90178f8c6355e736f8127a4a25a74-91fbbdba-a05a5da1",
        },
        ignoreTLS: true,
      },
      defaults: {
        // configurações que podem ser padrões
        from: '"',
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
