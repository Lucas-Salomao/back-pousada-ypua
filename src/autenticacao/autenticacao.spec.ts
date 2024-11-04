import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao.guard';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Mock do UsuarioService
const mockUsuarioService = {
  buscaPorEmail: jest.fn(),
};

// Mock do JwtService
const mockJwtService = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutenticacaoService,
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AutenticacaoService>(AutenticacaoService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    jwtService = module.get<JwtService>(JwtService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockEmail = 'test@example.com';
    const mockSenha = 'senha123';
    const mockUsuario = {
      id: '1',
      nome: 'Test User',
      email: mockEmail,
      senha: '$2b$10$mockHashedPassword',
    };

    it('deve retornar um token quando as credenciais estiverem corretas', async () => {
      const mockToken = 'mock.jwt.token';
      jest.spyOn(mockUsuarioService, 'buscaPorEmail').mockResolvedValue(mockUsuario);
      jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue(mockToken);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await service.login(mockEmail, mockSenha);

      expect(result).toEqual({ token_acesso: mockToken });
      expect(mockUsuarioService.buscaPorEmail).toHaveBeenCalledWith(mockEmail);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUsuario.id,
        nomeUsuario: mockUsuario.nome,
      });
    });

    it('deve lançar UnauthorizedException quando a senha estiver incorreta', async () => {
      jest.spyOn(mockUsuarioService, 'buscaPorEmail').mockResolvedValue(mockUsuario);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(service.login(mockEmail, 'senhaerrada')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

describe('AutenticacaoController', () => {
  let controller: AutenticacaoController;
  let service: AutenticacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticacaoController],
      providers: [
        {
          provide: AutenticacaoService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AutenticacaoController>(AutenticacaoController);
    service = module.get<AutenticacaoService>(AutenticacaoService);
  });

  describe('login', () => {
    it('deve chamar o service.login com as credenciais corretas', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        senha: 'senha123',
      };
      const mockToken = { token_acesso: 'mock.jwt.token' };

      jest.spyOn(service, 'login').mockResolvedValue(mockToken);

      const result = await controller.login(mockCredentials);

      expect(service.login).toHaveBeenCalledWith(
        mockCredentials.email,
        mockCredentials.senha,
      );
      expect(result).toEqual(mockToken);
    });
  });
});

describe('AutenticacaoGuard', () => {
  let guard: AutenticacaoGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutenticacaoGuard,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    guard = module.get<AutenticacaoGuard>(AutenticacaoGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve permitir o acesso com token válido', async () => {
    const mockPayload = { sub: '1', nomeUsuario: 'Test User' };
    const mockToken = 'valid.jwt.token';
    const mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    jest.spyOn(mockJwtService, 'verifyAsync').mockResolvedValue(mockPayload);

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockRequest['usuario']).toEqual(mockPayload);
  });

  it('deve lançar UnauthorizedException quando não houver token', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as ExecutionContext;

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve lançar UnauthorizedException quando o token for inválido', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid.token',
      },
    };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    jest.spyOn(mockJwtService, 'verifyAsync').mockRejectedValue(new Error());

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});