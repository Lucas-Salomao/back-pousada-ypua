import { Test, TestingModule } from '@nestjs/testing';
import { CPFIsUniqueValidator } from './cpf-is-unique.validator';
import { HospedeRepository } from '../hospede.repository';

describe('CPFIsUniqueValidator', () => {
  let validator: CPFIsUniqueValidator;
  let repository: HospedeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CPFIsUniqueValidator,
        {
          provide: HospedeRepository,
          useValue: {
            existwithCPF: jest.fn(),
          },
        },
      ],
    }).compile();

    validator = module.get<CPFIsUniqueValidator>(CPFIsUniqueValidator);
    repository = module.get<HospedeRepository>(HospedeRepository);
  });

  it('deve ser definido', () => {
    expect(validator).toBeDefined();
  });

  it('deve retornar true se o CPF for único', async () => {
    const cpf = '123.456.789-00';
    jest.spyOn(repository, 'existwithCPF').mockResolvedValue(false);

    const result = await validator.validate(cpf);
    expect(result).toBe(true);
  });

  it('deve retornar false se o CPF já existir', async () => {
    const cpf = '123.456.789-00';
    jest.spyOn(repository, 'existwithCPF').mockResolvedValue(true);

    const result = await validator.validate(cpf);
    expect(result).toBe(false);
  });
});