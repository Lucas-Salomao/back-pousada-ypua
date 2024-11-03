import { Test, TestingModule } from '@nestjs/testing';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

describe('MapsController', () => {
  let mapsController: MapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapsController],
      providers: [
        {
          provide: MapsService,
          useValue: {
            readMaps: jest.fn(),
          }
        },
      ],
    }).compile();

    mapsController = module.get<MapsController>(MapsController);
  });

  it('deve estar implementado', () => {
    expect(mapsController).toBeDefined();
  });

  it('deve buscar a chave da API do Google Maps', async () => {
    await mapsController.readReserva();
  });
});
