import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import 'dotenv/config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST, //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: parseInt(process.env.SMTP_PORT), // porta
        auth: {
          //dados do usuário e senha
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
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
