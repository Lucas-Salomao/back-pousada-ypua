import { Test, TestingModule } from '@nestjs/testing';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

describe('MapsController', () => {
  let controller: MapsController;
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapsController],
      providers: [
        {
          provide: MapsService,
          useValue: {
            readMaps: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MapsController>(MapsController);
    service = module.get<MapsService>(MapsService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar a chave do Google Maps', async () => {
    const apiKey = 'sua_chave_de_api';
    jest.spyOn(service, 'readMaps').mockResolvedValue({ apiKey });

    const result = await controller.readReserva();
    expect(result).toEqual({ apiKey });
  });
});