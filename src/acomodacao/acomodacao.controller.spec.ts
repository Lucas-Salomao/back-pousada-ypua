import { Test, TestingModule } from '@nestjs/testing';
import { AcomodacaoController } from './acomodacao.controller';
import { AcomodacaoService } from './acomodacao.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateAcomodacaoFormDataDTO } from './dto/CreateAcomodacaoFormData.dto';
import { AcomodacaoEntity } from './acomodacao.entity';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { FotosAcomodacaoEntity } from './fotos.acomodacao.entity';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';

describe('AcomodacaoController', () => {
	let acomodacaoController: AcomodacaoController;
	let acomodacaoService: AcomodacaoService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AcomodacaoController],
			providers: [
				{
					provide: AcomodacaoService,
					useValue: {
						createAcomodacao: jest.fn(),
						readAcomodacao: jest.fn(),
						updateAcomodacao: jest.fn(),
						deleteAcomodacao: jest.fn(),
					}
				},
				{
					provide: JwtService,
					useValue: {
						verifyAsync: jest.fn(),
					}
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					}
				},
			],
		}).compile();

		acomodacaoController = module.get<AcomodacaoController>(AcomodacaoController);
		acomodacaoService = module.get<AcomodacaoService>(AcomodacaoService);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('deve estar implementado', () => {
		expect(acomodacaoController).toBeDefined();
		expect(acomodacaoService).toBeDefined();
		expect(jwtService).toBeDefined();
	});

	it.skip('deve criar uma nova acomodacao', async () => {
		const acomodacao: CreateAcomodacaoFormDataDTO = {
			nome: 'teste',
			numero: '1',
			capacidade: '1',
			quantidadeCamas: '1',
			tipoCama: 'cama de casal',
			tipoBanheiro: 'privativo',
			comChuveiro: 'Sim',
			comBanheira: 'Sim',
			comToalhas: 'Sim',
			comSecador: 'Sim',
			comAcessibilidade: 'Sim',
			comCozinha: 'Sim',
			comRestaurante: 'Sim',
			comArCondicionado: 'Sim',
			comAquecedor: 'Sim',
			comTV: 'Sim',
			tamanhoTV: '55p',
			comWifi: 'Sim',
			comFrigobar: 'Sim',
			comCofre: 'Sim',
			comVaranda: 'Sim',
			descricao: 'teste',
			preco: '1000',
		}

		const fotos: Array<Express.Multer.File> = [
			{
				fieldname: 'foto',
				originalname: 'foto.jpg',
				encoding: '7bit',
				mimetype: 'image/jpeg',
				destination: 'uploads/',
				filename: 'foto.jpg',
				size: 123456,
				path: 'uploads/foto.jpg',
				buffer: Buffer.from(''),
				stream: null,
			}
		];

		const acomodacaoCriada: AcomodacaoEntity = {
			id: expect.any(String),
			nome: 'teste',
			numero: 1,
			capacidade: 1,
			quantidadeCamas: 1,
			tipoCama: 'cama de casal',
			tipoBanheiro: 'privativo',
			comChuveiro: true,
			comBanheira: true,
			comToalhas: true,
			comSecador: true,
			comAcessibilidade: true,
			comCozinha: true,
			comRestaurante: true,
			comArCondicionado: true,
			comAquecedor: true,
			comTV: true,
			tamanhoTV: NaN,
			comWifi: true,
			comFrigobar: true,
			comCofre: true,
			comVaranda: true,
			descricao: 'teste',
			preco: 1000,
			fotos: [
				new FotosAcomodacaoEntity({
					imagem: Buffer.from(''),
					nome: 'foto.jpg',
					tipo: 'image/jpeg',
				})
			],
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			deletedAt: null,
			reservas: [
				{
					id: expect.any(String),
					codigo: expect.any(String),
					status: expect.any(String),
					dataEntrada: expect.any(String),
					dataSaida: expect.any(String),
					valorTotal: expect.any(Number),
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
					deletedAt: null,
					usuario: expect.any(Object),
					acomodacao: expect.any(Object),
					hospedes: expect.any(Array),
				}
			],
		};

		await acomodacaoController.createAcomodacao(acomodacao, fotos);

		expect(acomodacaoService.createAcomodacao).toHaveBeenCalledWith(acomodacaoCriada);
	});

	it('deve listar todas as acomodacoes', async () => {
		await acomodacaoController.readAcomodacao()

		expect(acomodacaoService.readAcomodacao).toHaveBeenCalled();
	});

	it('deve atualizar uma acomodacao', async () => {
		const acomodacao: UpdateAcomodacaoDTO = {
			nome: 'teste',
			numero: 1,
			capacidade: 1,
			quantidadeCamas: 1,
			tipoCama: 'cama de casal',
			tipoBanheiro: 'privativo',
			categoria: 'teste',
			comBide: true,
			canaisTV: 'teste',
			velocidadeWifi: 'teste',
			vista: 'Sim',
			wifiPago: true,
			comMiniBar: true,
			comTelefone: true,
			comChuveiro: true,
			comBanheira: true,
			comArCondicionado: true,
			comAquecedor: true,
			comTV: true,
			tamanhoTV: 55,
			comWifi: true,
			comCofre: true,
			comVaranda: true,
			preco: 1000,
		}

		await acomodacaoController.updateAcomodacao('1', acomodacao);

		expect(acomodacaoService.updateAcomodacao).toHaveBeenCalledWith('1', acomodacao);
	});

	it('deve deletar uma acomodacao', async () => {
		await acomodacaoController.deleteAcomodacao('1')

		expect(acomodacaoService.deleteAcomodacao).toHaveBeenCalledWith('1');
	});
});
