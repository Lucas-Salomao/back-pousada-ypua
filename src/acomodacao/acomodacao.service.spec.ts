import { Test, TestingModule } from '@nestjs/testing';
import { AcomodacaoService } from './acomodacao.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AcomodacaoEntity } from './acomodacao.entity';
import { FotosAcomodacaoEntity } from './fotos.acomodacao.entity';
import { Repository } from 'typeorm';

describe('AcomodacaoService', () => {
  let service: AcomodacaoService;
  let acomodacaoRepository: Repository<AcomodacaoEntity>;
  let fotosRepository: Repository<FotosAcomodacaoEntity>;

  const mockAcomodacao = {
    id: '1',
    nome: 'Suíte Master',
    numero: 101,
    capacidade: 2,
    fotos: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcomodacaoService,
        {
          provide: getRepositoryToken(AcomodacaoEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(mockAcomodacao),
            find: jest.fn().mockResolvedValue([mockAcomodacao]),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
            findOneOrFail: jest.fn().mockResolvedValue(mockAcomodacao),
          },
        },
        {
          provide: getRepositoryToken(FotosAcomodacaoEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([]),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AcomodacaoService>(AcomodacaoService);
    acomodacaoRepository = module.get<Repository<AcomodacaoEntity>>(
      getRepositoryToken(AcomodacaoEntity),
    );
    fotosRepository = module.get<Repository<FotosAcomodacaoEntity>>(
      getRepositoryToken(FotosAcomodacaoEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAcomodacao', () => {
    it('should create a new acomodacao', async () => {
      const result = await service.createAcomodacao(mockAcomodacao as AcomodacaoEntity);
      expect(result).toEqual(mockAcomodacao);
      expect(acomodacaoRepository.save).toHaveBeenCalledWith(mockAcomodacao);
    });
  });

  describe('readAcomodacao', () => {
    it('should return all acomodacoes with their photos', async () => {
      const result = await service.readAcomodacao();
      expect(result).toEqual([mockAcomodacao]);
      expect(acomodacaoRepository.find).toHaveBeenCalledWith({ relations: ['fotos'] });
    });
  });

  describe('deleteAcomodacao', () => {
    it('should delete an acomodacao and its photos', async () => {
      await service.deleteAcomodacao('1');
      expect(fotosRepository.find).toHaveBeenCalled();
      expect(acomodacaoRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});