import { Test, TestingModule } from '@nestjs/testing';
import { RGIsUniqueValidator } from './rg-is-unique.validator';
import { HospedeRepository } from '../hospede.repository';

describe('RGIsUniqueValidator', () => {
  let validator: RGIsUniqueValidator;
  let repository: HospedeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RGIsUniqueValidator,
        {
          provide: HospedeRepository,
          useValue: {
            existwithRG: jest.fn(),
          },
        },
      ],
    }).compile();

    validator = module.get<RGIsUniqueValidator>(RGIsUniqueValidator);
    repository = module.get<HospedeRepository>(HospedeRepository);
  });

  it('deve ser definido', () => {
    expect(validator).toBeDefined();
  });

  it('deve retornar true se o RG for único', async () => {
    const rg = '123456789';
    jest.spyOn(repository, 'existwithRG').mockResolvedValue(false);

    const result = await validator.validate(rg);
    expect(result).toBe(true);
  });

  it('deve retornar false se o RG já existir', async () => {
    const rg = '123456789';
    jest.spyOn(repository, 'existwithRG').mockResolvedValue(true);

    const result = await validator.validate(rg);
    expect(result).toBe(false);
  });
});