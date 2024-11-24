import { AutenticacaoController } from './autenticacao.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoService } from './autenticacao.service';

describe('AutenticacaoController', () => {
	let autenticacaoController: AutenticacaoController;
	let autenticacaoService: AutenticacaoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AutenticacaoController],
			providers: [
				{
					provide: AutenticacaoService,
					useValue: {
						login: jest.fn(),
					}
				},
			],
		}).compile();

		autenticacaoController = module.get<AutenticacaoController>(AutenticacaoController);
		autenticacaoService = module.get<AutenticacaoService>(AutenticacaoService);
	});

	it('deve estar implementado', () => {
		expect(autenticacaoController).toBeDefined();
		expect(autenticacaoService).toBeDefined();
	});

	it('deve logar um usuário', async () => {
		const usuario = {
			email: 'user@mail.com',
			senha: '123456',
		}

		await autenticacaoController.login(usuario);

		expect(autenticacaoService.login).toHaveBeenCalledWith(usuario.email, usuario.senha);
	});
});
