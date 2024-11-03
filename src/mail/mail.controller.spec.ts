import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            sendEmail: jest.fn(),
          }
        },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('deve estar implementado', () => {
    expect(mailController).toBeDefined();
    expect(mailService).toBeDefined();
  });

  it('deve enviar um email', async () => {
    const email = {
      nome: 'teste',
      email: 'user@mail.com',
      telefone: '123456789',
      mensagem: 'mensagem de teste',
    }

    await mailController.enviarEmail({ body: email });

    expect(mailService.sendEmail).toHaveBeenCalledWith(email.nome, email.email, email.telefone, email.mensagem);
  });
});