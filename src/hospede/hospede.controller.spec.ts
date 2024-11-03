import { HospedeController } from './hospede.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { HospedeService } from './hospede.service';
import { JwtService } from '@nestjs/jwt';
import { CreateHospedeDTO } from './dto/create-hospede.dto';
import { UpdateHospedeDTO } from './dto/update-hospede.dto';

describe('HospedeController', () => {
  let hospedeController: HospedeController;
  let hospedeService: HospedeService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospedeController],
      providers: [
        {
          provide: HospedeService,
          useValue: {
            createHospede: jest.fn(),
            readHospede: jest.fn(),
            updateHospede: jest.fn(),
            deleteHospede: jest.fn(),
          }
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          }
        },
      ],
    }).compile();

    hospedeController = module.get<HospedeController>(HospedeController);
    hospedeService = module.get<HospedeService>(HospedeService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve estar implementado', () => {
    expect(hospedeController).toBeDefined();
    expect(hospedeService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('deve criar um novo hospede', async () => {
    const hospede: CreateHospedeDTO = {
      nome: 'teste',
      email: 'user@mail.com',
      rg: '123456789',
      cpf: '12345678900',
      rua: 'rua teste',
      numero: 123,
      complemento: 'teste',
      bairro: 'teste',
      cidade: 'teste',
      estado: 'teste',
      pais: 'teste',
    };

    const hospedeCriado = {
      id: expect.any(String),
      ...hospede,
    }

    await hospedeController.createHospede(hospede);

    expect(hospedeService.createHospede).toHaveBeenCalledWith(hospedeCriado);
  });

  it('deve listar todos os hospedes', async () => {
    await hospedeController.readHospede();

    expect(hospedeService.readHospede).toHaveBeenCalled();
  });

  it('deve atualizar um hospede', async () => {
    const hospede: UpdateHospedeDTO = {
      nome: 'teste',
      email: 'user@mail.com',
      rg: '123456789',
      cpf: '12345678900',
      rua: 'rua teste',
      numero: 123,
      complemento: 'teste',
      bairro: 'teste',
      cidade: 'teste',
      estado: 'teste',
      pais: 'teste',
    };

    await hospedeController.updateHospede('1', hospede);

    expect(hospedeService.updateHospede).toHaveBeenCalledWith('1', hospede);
  });

  it('deve deletar um hospede', async () => {
    await hospedeController.deleteHospede('1');

    expect(hospedeService.deleteHospede).toHaveBeenCalledWith('1');
  });
});
