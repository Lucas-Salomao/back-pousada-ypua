import { UpdateReservaDTO } from './dto/update-reserva.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { ReservaService } from './reserva.service';
import { ReservaRepository } from './reserva.repository';
import { AcomodacaoEntity } from '../acomodacao/acomodacao.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { HospedeEntity } from '../hospede/hospede.entity';
import { HotelCodeGeneratorService } from './hotel-code-generator.service';
import { StatusReserva } from './enum/StatusReserva.enum';
import { CreateReservaFormDataDTO } from './dto/create-reserva-formdata.dto';

const mockReservaList: ReservaEntity[] = [
  {
    id: '1',
    codigo: '123456',
    dataEntrada: new Date().toISOString(),
    dataSaida: new Date().toISOString(),
    status: StatusReserva.RESERVADO,
    usuario: new UsuarioEntity(),
    valorTotal: 1000,
    acomodacao: new AcomodacaoEntity(),
    hospedes: [new HospedeEntity()],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: '2',
    codigo: '123457',
    dataEntrada: new Date().toISOString(),
    dataSaida: new Date().toISOString(),
    status: StatusReserva.CANCELADO,
    usuario: new UsuarioEntity(),
    valorTotal: 1000,
    acomodacao: new AcomodacaoEntity(),
    hospedes: [new HospedeEntity()],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
];

const mockCreateReservaFormDataDTO: CreateReservaFormDataDTO = {
  usuarioId: '1',
  acomodacaoId: '1',
  hospedeIds: ['1'],
  dataEntrada: new Date().toISOString(),
  dataSaida: new Date().toISOString(),
  status: StatusReserva.RESERVADO,
  valorTotal: '1000',
};

const mockUpdateReservaDTO: UpdateReservaDTO = {
  dataEntrada: new Date().toISOString(),
  dataSaida: new Date().toISOString(),
  status: StatusReserva.RESERVADO,
  valorTotal: 1000,
  codigo: '123456',
  usuarioId: '1',
};

describe('ReservaService', () => {
  let reservaService: ReservaService;
  let reservaRepository: Repository<ReservaEntity>;
  let hotelCodeGeneratorService: HotelCodeGeneratorService;
  let usuarioRepository: Repository<UsuarioEntity>;
  let hospedeRepository: Repository<HospedeEntity>;
  let acomodacaoRepository: Repository<AcomodacaoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservaService,
        HotelCodeGeneratorService,
        {
          provide: getRepositoryToken(ReservaEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(mockReservaList),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        {
          provide: ReservaRepository,
          useValue: {
            searchByCode: jest.fn(),
            searchByName: jest.fn(),
            searchByCpf: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(AcomodacaoEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(HospedeEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    }).compile();

    reservaService = module.get<ReservaService>(ReservaService);
    reservaRepository = module.get<Repository<ReservaEntity>>(getRepositoryToken(ReservaEntity));
    hotelCodeGeneratorService = module.get<HotelCodeGeneratorService>(HotelCodeGeneratorService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    hospedeRepository = module.get<Repository<HospedeEntity>>(getRepositoryToken(HospedeEntity));
    acomodacaoRepository = module.get<Repository<AcomodacaoEntity>>(getRepositoryToken(AcomodacaoEntity));
  });

  it('deve estar implementado', () => {
    expect(reservaService).toBeDefined();
    expect(reservaRepository).toBeDefined();
    expect(hotelCodeGeneratorService).toBeDefined();
    expect(usuarioRepository).toBeDefined();
    expect(hospedeRepository).toBeDefined();
    expect(acomodacaoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar lista de reservas', async () => {
      const reservas = await reservaService.readReserva();

      expect(reservas).toEqual(mockReservaList);
      expect(reservaRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve retornar lista vazia', async () => {
      (reservaRepository.find as jest.Mock).mockResolvedValueOnce([]);
      const reservas = await reservaService.readReserva();

      expect(reservas).toEqual([]);
      expect(reservaRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro', async () => {
      (reservaRepository.find as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar reservas'));

      await expect(reservaService.readReserva()).rejects.toThrow('Erro ao buscar reservas');
    });
  });

  describe('findOne', () => {
    it('deve retornar uma reserva', async () => {
      const mockReserva = mockReservaList[0];
      (reservaRepository.findOneBy as jest.Mock).mockResolvedValueOnce(mockReserva);

      const reserva = await reservaService.readReservaByCode('123456');

      expect(reserva).toEqual(mockReserva);
      expect(reservaRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro', async () => {
      (reservaRepository.findOneBy as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar reserva'));

      await expect(reservaService.readReservaByCode('123456')).rejects.toThrow('Erro ao buscar reserva');
    });
  });

  describe('createReserva', () => {
    it('deve criar uma nova reserva', async () => {
      (usuarioRepository.findOneBy as jest.Mock).mockResolvedValueOnce(new UsuarioEntity());
      (acomodacaoRepository.findOneBy as jest.Mock).mockResolvedValueOnce(new AcomodacaoEntity());
      (hospedeRepository.findOneBy as jest.Mock).mockResolvedValueOnce(new HospedeEntity());
      (reservaRepository.save as jest.Mock).mockResolvedValueOnce(mockReservaList[0]);

      const reservaCriado = await reservaService.createReserva(mockCreateReservaFormDataDTO);

      expect(reservaCriado).toEqual(mockReservaList[0]);
      expect(reservaRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro', async () => {
      (usuarioRepository.findOneBy as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar usuario'));

      await expect(reservaService.createReserva(mockCreateReservaFormDataDTO)).rejects.toThrow('Erro ao buscar usuario');
    });
  });

  describe('updateReserva', () => {
    it('deve atualizar uma reserva', async () => {
      (reservaRepository.update as jest.Mock).mockResolvedValueOnce({ affected: 1 });

      await reservaService.updateReserva('1', mockUpdateReservaDTO);

      expect(reservaRepository.update).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro', async () => {
      (reservaRepository.update as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar reserva'));

      await expect(reservaService.updateReserva('1', mockUpdateReservaDTO)).rejects.toThrow('Erro ao atualizar reserva');
    });
  });

  describe('deleteReserva', () => {
    it('deve deletar uma reserva', async () => {
      (reservaRepository.delete as jest.Mock).mockResolvedValueOnce({ affected: 1 });

      await reservaService.deleteReserva('1');

      expect(reservaRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro', async () => {
      (reservaRepository.delete as jest.Mock).mockRejectedValueOnce(new Error('Erro ao deletar reserva'));

      await expect(reservaService.deleteReserva('1')).rejects.toThrow('Erro ao deletar reserva');
    });
  });
});