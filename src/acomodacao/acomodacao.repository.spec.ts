import { Test, TestingModule } from '@nestjs/testing';
import { AcomodacaoRepository } from './acomodacao.repository';
import { AcomodacaoEntity } from './acomodacao.entity';

describe('AcomodacaoRepository', () => {
  let repository: AcomodacaoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcomodacaoRepository],
    }).compile();

    repository = module.get<AcomodacaoRepository>(AcomodacaoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('existWithNumber', () => {
    it('should return true if acomodacao number exists', async () => {
      const mockAcomodacao = new AcomodacaoEntity();
      mockAcomodacao.numero = 101;
      await repository.createAcomodacao(mockAcomodacao);

      const result = await repository.existWithNumber(101);
      expect(result).toBeTruthy();
    });

    it('should return false if acomodacao number does not exist', async () => {
      const result = await repository.existWithNumber(999);
      expect(result).toBeFalsy();
    });
  });

  describe('searchByID', () => {
    it('should find acomodacao by ID', async () => {
      const mockAcomodacao = new AcomodacaoEntity();
      mockAcomodacao.id = '1';
      await repository.createAcomodacao(mockAcomodacao);

      const result = repository.searchByID('1');
      expect(result).toEqual(mockAcomodacao);
    });

    it('should throw error if acomodacao not found', () => {
      expect(() => repository.searchByID('999')).toThrow('Acomodação nao existe');
    });
  });
});