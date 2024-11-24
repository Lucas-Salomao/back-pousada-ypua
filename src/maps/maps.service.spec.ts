import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapsService: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MapsService
      ],
    }).compile();

    mapsService = module.get<MapsService>(MapsService);
  });

  it('deve estar implementado', () => {
    expect(mapsService).toBeDefined();
  });

  describe('readMaps', () => {
    it('deve retornar apiKey', async () => {
      const maps = await mapsService.readMaps();

      expect(maps).toEqual({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
    });

    it('deve retornar apiKey vazia', async () => {
      process.env.GOOGLE_MAPS_API_KEY = '';
      const maps = await mapsService.readMaps();

      expect(maps).toEqual({ apiKey: '' });
    });
  });
});