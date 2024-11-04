import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { MailModule } from './mail.module';

describe('MailController', () => {
  let controller: MailController;
  let service: MailService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  const mockMailService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    controller = module.get<MailController>(MailController);
    service = module.get<MailService>(MailService);
  });

  describe('enviarEmail', () => {
    it('deve enviar um email com os dados fornecidos', async () => {
      const mockRequest = {
        body: {
          nome: 'John Doe',
          email: 'johndoe@example.com',
          telefone: '11999999999',
          mensagem: 'Teste de mensagem',
        },
      };

      await controller.enviarEmail(mockRequest);

      expect(service.sendEmail).toHaveBeenCalledWith(
        mockRequest.body.nome,
        mockRequest.body.email,
        mockRequest.body.telefone,
        mockRequest.body.mensagem,
      );
    });
  });
});

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendEmail', () => {
    it('deve enviar um email com os parâmetros corretos', async () => {
      const nome = 'John Doe';
      const email = 'johndoe@example.com';
      const telefone = '11999999999';
      const mensagem = 'Teste de mensagem';

      await service.sendEmail(nome, email, telefone, mensagem);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: 'lucastadeusalomao@gmail.com',
        from: email,
        subject: `'E-mail de Contato - Cliente ${nome}'`,
        html: `<h3 style="color: blue">${mensagem}</h3><br><h3 style="color: red">Entrar em contato pelo telefone ${telefone}</h3>`,
      });
    });

    it('deve lançar erro se o envio falhar', async () => {
      const nome = 'John Doe';
      const email = 'johndoe@example.com';
      const telefone = '11999999999';
      const mensagem = 'Teste de mensagem';

      jest.spyOn(mailerService, 'sendMail').mockRejectedValue(new Error('Erro ao enviar email'));

      await expect(service.sendEmail(nome, email, telefone, mensagem))
        .rejects
        .toThrow('Erro ao enviar email');
    });
  });
});

describe('MailModule', () => {
  it('deve compilar o módulo', async () => {
    const module = await Test.createTestingModule({
      imports: [MailModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('deve ter o MailController definido', async () => {
    const module = await Test.createTestingModule({
      imports: [MailModule],
    }).compile();

    const controller = module.get<MailController>(MailController);
    expect(controller).toBeDefined();
  });

  it('deve ter o MailService definido', async () => {
    const module = await Test.createTestingModule({
      imports: [MailModule],
    }).compile();

    const service = module.get<MailService>(MailService);
    expect(service).toBeDefined();
  });
});

// Mock das variáveis de ambiente para testes
jest.mock('dotenv/config', () => ({
  process: {
    env: {
      MAIL_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      MAIL_USER: 'test@example.com',
      MAIL_PASSWORD: 'password123',
    },
  },
}));