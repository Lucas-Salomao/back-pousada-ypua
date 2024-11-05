import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';

const mailArgs = {
  nome: 'teste',
  email: 'user1@mail.com',
  telefone: '123456789',
  mensagem: 'teste',
};

describe('MapsService', () => {
  let mailService: MailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        MailerService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          }
        }
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('deve estar implementado', () => {
    expect(mailService).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  describe('sendMail', () => {
    it('deve enviar email', async () => {
      await mailService.sendEmail(mailArgs.nome, mailArgs.email, mailArgs.telefone, mailArgs.mensagem);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    });

    it('deve retornar erro', async () => {
      (mailerService.sendMail as jest.Mock).mockRejectedValueOnce(new Error('Erro ao enviar email'));

      await expect(mailService.sendEmail(mailArgs.nome, mailArgs.email, mailArgs.telefone, mailArgs.mensagem)).rejects.toThrowError('Erro ao enviar email');
    });
  });
});