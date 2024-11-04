import { Test, TestingModule } from '@nestjs/testing';
import { EmailIsUniqueValidator } from './email-is-unique.validator';
import { HospedeRepository } from '../hospede.repository';


describe('EmailIsUniqueValidator', () => {
  let validator: EmailIsUniqueValidator;
  let repository: HospedeRepository;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailIsUniqueValidator,
        {
          provide: HospedeRepository,
          useValue: {
            existwithEmail: jest.fn(),
          },
        },
      ],
    }).compile();


    validator = module.get<EmailIsUniqueValidator>(EmailIsUniqueValidator);
    repository = module.get<HospedeRepository>(HospedeRepository)
  });


  it('deve ser definido', () => {
    expect(validator).toBeDefined();
  });


  it('deve retornar true se o email for único', async () => {
    jest.spyOn(repository, 'existwithEmail').mockResolvedValue(false);
    const result = await validator.validate('test@example.com');
    expect(result).toBe(true);
  });


  it('deve retornar false se o email já existir', async () => {
    jest.spyOn(repository, 'existwithEmail').mockResolvedValue(true);
    const result = await validator.validate('test@example.com');
    expect(result).toBe(false);
  });
});