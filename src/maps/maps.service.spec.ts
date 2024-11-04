import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';
import { ConfigService } from '@nestjs/config';


describe('MapsService', () => {
  let service: MapsService;
  let configService:ConfigService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapsService,
      {
        provide: ConfigService,
        useValue: {
          get: jest.fn(),
        },
      }],
    }).compile();

    service = module.get<MapsService>(MapsService);
    configService = module.get<ConfigService>(ConfigService);

  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar as configurações do mapa', async () => {

    const googleMapsKeyMock = 'sua_chave_de_api';
    jest.spyOn(configService, 'get').mockReturnValue(googleMapsKeyMock);
    const expectedMapsConfig = { apiKey: googleMapsKeyMock };
    const mapsConfig = await service.readMaps();

    expect(mapsConfig).toEqual(expectedMapsConfig);

  });
});