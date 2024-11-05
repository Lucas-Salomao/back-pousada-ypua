import { Test, TestingModule } from '@nestjs/testing';
import { HospedeService } from './hospede.service';
import { Repository } from 'typeorm';
import { HospedeEntity } from './hospede.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StatusReserva } from '../reserva/enum/StatusReserva.enum';
import { UpdateHospedeDTO } from './dto/update-hospede.dto';

const mockHospedeList: HospedeEntity[] = [
	{
		id: '1',
		nome: 'teste',
		rg: '123456789',
		cpf: '12345678901',
		email: 'user1@mail.com',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		deletedAt: null,
		rua: 'teste',
		numero: 123,
		complemento: 'teste',
		bairro: 'teste',
		cidade: 'teste',
		estado: 'teste',
		pais: 'teste',
		reserva: {
			id: '1',
			codigo: '123456',
			dataEntrada: new Date().toISOString(),
			dataSaida: new Date().toISOString(),
			status: StatusReserva.RESERVADO,
			valorTotal: 1000,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			deletedAt: null,
			usuario: {
				id: '1',
				nome: 'teste',
				email: 'user1@mail.com',
				rg: '123456789',
				cpf: '12345678901',
				role: 'admin',
				senha: '123456',
				rua: 'teste',
				numero: 123,
				complemento: 'teste',
				bairro: 'teste',
				cidade: 'teste',
				estado: 'teste',
				pais: 'teste',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				deletedAt: null,
				reservas: [],
			},
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
			hospedes: [],
		},
	},
];

const mockUpdateHospedeDTO: UpdateHospedeDTO = {
	nome: 'teste',
	rg: '123456789',
	cpf: '12345678901',
	email: 'user1@mail.com',
	rua: 'teste',
	numero: 123,
	complemento: 'teste',
	bairro: 'teste',
	cidade: 'teste',
	estado: 'teste',
	pais: 'teste',
};

describe('HospedeService', () => {
	let hospedeService: HospedeService;
	let hospedeRepository: Repository<HospedeEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				HospedeService,
				{
					provide: getRepositoryToken(HospedeEntity),
					useValue: {
						find: jest.fn().mockReturnValue(mockHospedeList),
						save: jest.fn(),
						update: jest.fn(),
						delete: jest.fn(),
					}
				}
			],
		}).compile();

		hospedeService = module.get<HospedeService>(HospedeService);
		hospedeRepository = module.get<Repository<HospedeEntity>>(getRepositoryToken(HospedeEntity));
	});

	it('deve estar implementado', () => {
		expect(hospedeService).toBeDefined();
		expect(hospedeRepository).toBeDefined();
	});

	describe('findAll', () => {
		it('deve retornar lista de hospedes', async () => {
			const hospedes = await hospedeService.readHospede();

			expect(hospedes).toEqual(mockHospedeList);
			expect(hospedeRepository.find).toHaveBeenCalledTimes(1);
		});

		it('deve retornar lista vazia', async () => {
			(hospedeRepository.find as jest.Mock).mockResolvedValueOnce([]);
			const hospedes = await hospedeService.readHospede();

			expect(hospedes).toEqual([]);
			expect(hospedeRepository.find).toHaveBeenCalledTimes(1);
		});

		it('deve retornar um erro', async () => {
			(hospedeRepository.find as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar hospedes'));

			await expect(hospedeService.readHospede()).rejects.toThrow('Erro ao buscar hospedes');
		});
	});

	describe('createHospede', () => {
		it('deve criar um hospede', async () => {
			const mockHospede = mockHospedeList[0];
			(hospedeRepository.save as jest.Mock).mockResolvedValueOnce(mockHospede);

			const hospede = await hospedeService.createHospede(mockHospede);

			expect(hospede).toEqual(undefined);
			expect(hospedeRepository.save).toHaveBeenCalledTimes(1);
		});

		it('deve retornar um erro', async () => {
			(hospedeRepository.save as jest.Mock).mockRejectedValueOnce(new Error('Erro ao criar hospede'));

			await expect(hospedeService.createHospede(mockHospedeList[0])).rejects.toThrow('Erro ao criar hospede');
		});
	});

	describe('updateHospede', () => {
		it('deve atualizar um hospede', async () => {
			const mockHospede = mockHospedeList[0];
			(hospedeRepository.update as jest.Mock).mockResolvedValueOnce(true);

			const hospede = await hospedeService.updateHospede('1', mockUpdateHospedeDTO);

			expect(hospede).toEqual(undefined);
			expect(hospedeRepository.update).toHaveBeenCalledTimes(1);
		});

		it('deve retornar um erro', async () => {
			(hospedeRepository.update as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar hospede'));

			await expect(hospedeService.updateHospede('1', mockUpdateHospedeDTO)).rejects.toThrow('Erro ao atualizar hospede');
		});
	});

	describe('deleteHospede', () => {
		it('deve deletar um hospede', async () => {
			(hospedeRepository.delete as jest.Mock).mockResolvedValueOnce(true);

			const hospede = await hospedeService.deleteHospede('1');

			expect(hospede).toEqual(undefined);
			expect(hospedeRepository.delete).toHaveBeenCalledTimes(1);
		});

		it('deve retornar um erro', async () => {
			(hospedeRepository.delete as jest.Mock).mockRejectedValueOnce(new Error('Erro ao deletar hospede'));

			await expect(hospedeService.deleteHospede('1')).rejects.toThrow('Erro ao deletar hospede');
		});
	});
});