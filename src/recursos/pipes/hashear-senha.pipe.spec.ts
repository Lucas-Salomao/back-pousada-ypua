import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HashearSenhaPipe } from './hashear-senha.pipe';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('HashearSenhaPipe', () => {
  let pipe: HashearSenhaPipe;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashearSenhaPipe,
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ],
    }).compile();

    pipe = module.get<HashearSenhaPipe>(HashearSenhaPipe);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should hash the password correctly', async () => {
      // Arrange
      const senha = 'senha123';
      const salt = '10';
      const hashedPassword = 'hashedPassword123';

      mockConfigService.get.mockReturnValue(salt);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      // Act
      const result = await pipe.transform(senha);

      // Assert
      expect(configService.get).toHaveBeenCalledWith('SALT_PASSWORD');
      expect(bcrypt.hash).toHaveBeenCalledWith(senha, salt);
      expect(result).toBe(hashedPassword);
    });

    it('should throw an error if hash fails', async () => {
      // Arrange
      const senha = 'senha123';
      const salt = '10';
      const error = new Error('Hash failed');

      mockConfigService.get.mockReturnValue(salt);
      (bcrypt.hash as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(pipe.transform(senha)).rejects.toThrow(error);
      expect(configService.get).toHaveBeenCalledWith('SALT_PASSWORD');
      expect(bcrypt.hash).toHaveBeenCalledWith(senha, salt);
    });

    it('should throw an error if salt is not found in config', async () => {
      // Arrange
      const senha = 'senha123';
      mockConfigService.get.mockReturnValue(null);

      // Act & Assert
      await expect(pipe.transform(senha)).rejects.toThrow();
      expect(configService.get).toHaveBeenCalledWith('SALT_PASSWORD');
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });
  });
});