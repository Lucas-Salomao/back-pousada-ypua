import { Test, TestingModule } from '@nestjs/testing';
import { AcomodacaoService } from './acomodacao.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AcomodacaoEntity } from './acomodacao.entity';
import { FotosAcomodacaoEntity } from './fotos.acomodacao.entity';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';

const mockFotosAcomodacao: FotosAcomodacaoEntity[] = [
	{
		id: '1',
		imagem: Buffer.from('teste'),
		nome: 'teste',
		tipo: 'teste',
		acomodacao: {
			id: '2',
			nome: 'teste2',
			descricao: 'teste2',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			deletedAt: null,
			numero: 1,
			capacidade: 1,
			comAcessibilidade: false,
			comAquecedor: false,
			comArCondicionado: false,
			comBanheira: false,
			comChuveiro: false,
			comCofre: false,
			comFrigobar: false,
			comCozinha: false,
			comRestaurante: false,
			comSecador: false,
			comToalhas: false,
			comTV: false,
			comVaranda: false,
			comWifi: false,
			quantidadeCamas: 1,
			preco: 100,
			tamanhoTV: 1,
			tipoBanheiro: 'teste',
			tipoCama: 'teste',
			reservas: [],
			fotos: [],
		},
	},
	{
		id: '2',
		imagem: Buffer.from('teste'),
		nome: 'teste',
		tipo: 'teste',
		acomodacao: {
			id: '1',
			nome: 'teste',
			descricao: 'teste',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			deletedAt: null,
			numero: 1,
			capacidade: 1,
			comAcessibilidade: false,
			comAquecedor: false,
			comArCondicionado: false,
			comBanheira: false,
			comChuveiro: false,
			comCofre: false,
			comFrigobar: false,
			comCozinha: false,
			comRestaurante: false,
			comSecador: false,
			comToalhas: false,
			comTV: false,
			comVaranda: false,
			comWifi: false,
			quantidadeCamas: 1,
			preco: 100,
			tamanhoTV: 1,
			tipoBanheiro: 'teste',
			tipoCama: 'teste',
			reservas: [],
			fotos: [],
		},
	}
];

const mockAcomodacao: AcomodacaoEntity[] = [
	{
		id: '1',
		nome: 'teste',
		descricao: 'teste',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		deletedAt: null,
		numero: 1,
		capacidade: 1,
		comAcessibilidade: false,
		comAquecedor: false,
		comArCondicionado: false,
		comBanheira: false,
		comChuveiro: false,
		comCofre: false,
		comFrigobar: false,
		comCozinha: false,
		comRestaurante: false,
		comSecador: false,
		comToalhas: false,
		comTV: false,
		comVaranda: false,
		comWifi: false,
		quantidadeCamas: 1,
		preco: 100,
		tamanhoTV: 1,
		tipoBanheiro: 'teste',
		tipoCama: 'teste',
		reservas: [],
		fotos: mockFotosAcomodacao,
	},
	{
		id: '2',
		nome: 'teste2',
		descricao: 'teste2',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		deletedAt: null,
		numero: 1,
		capacidade: 1,
		comAcessibilidade: false,
		comAquecedor: false,
		comArCondicionado: false,
		comBanheira: false,
		comChuveiro: false,
		comCofre: false,
		comFrigobar: false,
		comCozinha: false,
		comRestaurante: false,
		comSecador: false,
		comToalhas: false,
		comTV: false,
		comVaranda: false,
		comWifi: false,
		quantidadeCamas: 1,
		preco: 100,
		tamanhoTV: 1,
		tipoBanheiro: 'teste',
		tipoCama: 'teste',
		reservas: [],
		fotos: mockFotosAcomodacao,
	}
];

const mockUpdateAcomodacaoDTO: UpdateAcomodacaoDTO = {
	nome: 'teste',
	categoria: 'teste',
	numero: 1,
	capacidade: 1,
	comBide: false,
	comAquecedor: false,
	comArCondicionado: false,
	comBanheira: false,
	comChuveiro: false,
	comCofre: false,
	comMiniBar: false,
	comTelefone: false,
	comTV: false,
	comVaranda: false,
	comWifi: false,
	canaisTV: 'teste',
	velocidadeWifi: 'teste',
	wifiPago: false,
	vista: 'teste',
	quantidadeCamas: 1,
	preco: 100,
	tamanhoTV: 1,
	tipoBanheiro: 'teste',
	tipoCama: 'teste',
}

describe('AcomodacaoService', () => {
	let acomodacaoService: AcomodacaoService;
	let acomodacaoRepository: Repository<AcomodacaoEntity>;
	let fotosAcomodacaoRepository: Repository<FotosAcomodacaoEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AcomodacaoService,
				{
					provide: getRepositoryToken(AcomodacaoEntity),
					useValue: {
						find: jest.fn().mockResolvedValue(mockAcomodacao),
						save: jest.fn().mockResolvedValue(mockAcomodacao[0]),
						update: jest.fn().mockResolvedValue(mockUpdateAcomodacaoDTO),
						delete: jest.fn(),
						findOneOrFail: jest.fn().mockResolvedValue(mockAcomodacao[0]),
					}
				},
				{
					provide: getRepositoryToken(FotosAcomodacaoEntity),
					useValue: {
						find: jest.fn().mockResolvedValue(mockFotosAcomodacao),
						save: jest.fn().mockResolvedValue(mockFotosAcomodacao[0]),
						create: jest.fn().mockResolvedValue(mockFotosAcomodacao[0]),
						delete: jest.fn(),
					}
				},
			],
		}).compile();

		acomodacaoService = module.get<AcomodacaoService>(AcomodacaoService);
		acomodacaoRepository = module.get<Repository<AcomodacaoEntity>>(getRepositoryToken(AcomodacaoEntity));
		fotosAcomodacaoRepository = module.get<Repository<FotosAcomodacaoEntity>>(getRepositoryToken(FotosAcomodacaoEntity));
	});

	it('deve estar implementado', () => {
		expect(acomodacaoService).toBeDefined();
		expect(acomodacaoRepository).toBeDefined();
		expect(fotosAcomodacaoRepository).toBeDefined();
	});

	describe('readAcomodacao', () => {
		it('deve retornar lista de acomodacoes', async () => {
			const acomodacoes = await acomodacaoService.readAcomodacao();

			expect(acomodacoes).toEqual(mockAcomodacao);
			expect(acomodacaoRepository.find).toHaveBeenCalledTimes(1);
		});

		it('deve retornar uma lista vazia', async () => {
			(acomodacaoRepository.find as jest.Mock).mockResolvedValueOnce([]);

			const acomodacoes = await acomodacaoService.readAcomodacao();

			expect(acomodacoes).toEqual([]);
			expect(acomodacaoRepository.find).toHaveBeenCalledTimes(1);
		});

		it('deve retornar erro ao buscar acomodacao', async () => {
			(acomodacaoRepository.find as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar acomodacao'));

			await expect(acomodacaoService.readAcomodacao()).rejects.toThrow('Erro ao buscar acomodacao');
		});
	});

	describe('createAcomodacao', () => {
		it('deve criar uma acomodacao', async () => {
			const acomodacao = await acomodacaoService.createAcomodacao(mockAcomodacao[0]);

			expect(acomodacao).toEqual(mockAcomodacao[0]);
			expect(acomodacaoRepository.save).toHaveBeenCalledTimes(1);
		});

		it('deve retornar erro ao criar uma acomodacao', async () => {
			const acomodacao = await acomodacaoService.createAcomodacao(mockAcomodacao[0]);

			expect(acomodacao).toEqual(mockAcomodacao[0]);
			expect(acomodacaoRepository.save).toHaveBeenCalledTimes(1);
		});
	});

	describe('updateAcomodacao', () => {
		it('deve atualizar uma acomodacao', async () => {
			const acomodacao = await acomodacaoService.updateAcomodacao('1', mockUpdateAcomodacaoDTO);

			expect(acomodacao).toEqual(undefined);
			expect(acomodacaoRepository.update).toHaveBeenCalledTimes(1);
		});

		it('deve retornar erro ao atualizar uma acomodacao', async () => {
			(acomodacaoRepository.update as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar acomodacao'));

			await expect(acomodacaoService.updateAcomodacao('1', mockUpdateAcomodacaoDTO)).rejects.toThrow('Erro ao atualizar acomodacao');
		});
	});

	describe('deleteAcomodacao', () => {
		it('deve deletar uma acomodacao', async () => {
			await acomodacaoService.deleteAcomodacao('1');

			expect(acomodacaoRepository.delete).toHaveBeenCalledTimes(1);
		});

		it('deve retornar erro ao deletar uma acomodacao', async () => {
			(acomodacaoRepository.delete as jest.Mock).mockRejectedValueOnce(new Error('Erro ao deletar acomodacao'));

			await expect(acomodacaoService.deleteAcomodacao('1')).rejects.toThrow('Erro ao deletar acomodacao');
		});
	});

	describe('createFoto', () => {
		it('deve criar uma foto', async () => {
			const foto = await acomodacaoService.createFoto(mockFotosAcomodacao[0].acomodacao.id, mockFotosAcomodacao[0].imagem, mockFotosAcomodacao[0].nome, mockFotosAcomodacao[0].tipo);

			expect(foto).toEqual(mockFotosAcomodacao[0]);
			expect(fotosAcomodacaoRepository.save).toHaveBeenCalledTimes(1);
		});

		it('deve retornar erro ao criar uma foto', async () => {
			(fotosAcomodacaoRepository.save as jest.Mock).mockRejectedValueOnce(new Error('Erro ao criar foto'));

			await expect(acomodacaoService.createFoto(mockFotosAcomodacao[0].acomodacao.id, mockFotosAcomodacao[0].imagem, mockFotosAcomodacao[0].nome, mockFotosAcomodacao[0].tipo)).rejects.toThrow('Erro ao criar foto');
		});
	});
});