import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoService } from './autenticacao.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from '../usuario/usuario.entity';

const mockUsuarioEntity = {
  id: '1',
  nome: 'teste',
  email: 'user1@mail.com',
  senha: '123456',
  role: 'admin',
};

describe('AutenticacaoService', () => {
  let autenticacaoService: AutenticacaoService;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;
  let usuarioRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutenticacaoService,
        UsuarioService,
        JwtService,
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn().mockResolvedValue(mockUsuarioEntity),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    }).compile();

    autenticacaoService = module.get<AutenticacaoService>(AutenticacaoService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    jwtService = module.get<JwtService>(JwtService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
  });

  it('deve estar implementado', () => {
    expect(autenticacaoService).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(usuarioRepository).toBeDefined();
  });

  describe('login', () => {
    it.skip('deve logar um usuario', async () => {
      const mockUsuario = {
        email: 'user1@mail.com',
        senha: '123456',
      };

      const result = await autenticacaoService.login(mockUsuario.email, mockUsuario.senha);

      expect(result).toEqual({
        id: '1',
        nome: 'teste',
        email: 'user1@mail.com',
        role: 'admin',
        token: expect.any(String),
      });

      expect(usuarioRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar não autorizado', async () => {
      const mockUsuario = {
        email: 'user1@mail.com',
        senha: '123456',
      };

      await expect(autenticacaoService.login(mockUsuario.email, mockUsuario.senha)).rejects.toThrow('Email ou senha incorretos');
    });

    it('deve retornar usuario não encontrado', async () => {
      const mockUsuario = {
        email: 'user1@mail.com',
        senha: '123456',
      };

      (usuarioRepository.findOne as jest.Mock).mockResolvedValueOnce(undefined);

      await expect(autenticacaoService.login(mockUsuario.email, mockUsuario.senha)).rejects.toThrow('Usuario não encontrado');

      expect(usuarioRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});