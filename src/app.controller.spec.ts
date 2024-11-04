import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getStatusSever', () => {
    it('should return "running server"', () => {
      const result = 'running server';
      jest.spyOn(appService, 'getStatusSever').mockImplementation(() => result);
      expect(appController.getStatusSever()).toBe(result);
    });
  });
});