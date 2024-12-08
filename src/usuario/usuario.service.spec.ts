import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ShowUsuarioDTO } from './dto/ShowUsuario.dto';

const mockUsuarioList: UsuarioEntity[] = [
  {
    id: '1',
    nome: 'teste',
    email: 'user1@mail.com',
    rg: '123456789',
    cpf: '12345678901',
    role: 'admin',
    senha: '123456',
    rua: 'teste',
    numero: 123,
    complemento: 'teste',
    bairro: 'teste',
    cidade: 'teste',
    estado: 'teste',
    pais: 'teste',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    reservas: [],
  },
  {
    id: '2',
    nome: 'teste',
    email: 'user2@mail.com',
    rg: '123456789',
    cpf: '12345678901',
    role: 'admin',
    senha: '123456',
    rua: 'teste',
    numero: 123,
    complemento: 'teste',
    bairro: 'teste',
    cidade: 'teste',
    estado: 'teste',
    pais: 'teste',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    reservas: [],
  },
]

const mockShowUsuarioList: ShowUsuarioDTO[] = [
  {
    id: '1',
    nome: 'teste',
    email: 'user1@mail.com',
    rg: '123456789',
    cpf: '12345678901',
    rua: 'Rua Teste',
    numero: 123,
    complemento: 'Apto 101',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    pais: 'Brasil',
    role: 'admin',
  },
  {
    id: '2',
    nome: 'teste',
    email: 'user2@mail.com',
    rg: '123456789',
    cpf: '12345678901',
    rua: 'Rua Exemplo',
    numero: 456,
    complemento: 'Casa',
    bairro: 'Jardim',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    pais: 'Brasil',
    role: 'admin',
  },
]

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;
  let usuarioRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(mockShowUsuarioList),
            findOne: jest.fn().mockResolvedValue(mockUsuarioList[0]),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    }).compile();

    usuarioService = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
  });

  it('deve estar implementado', () => {
    expect(usuarioService).toBeDefined();
    expect(usuarioRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar lista de usuarios', async () => {
      const usuarios = await usuarioService.readUsuario();

      expect(usuarios).toEqual(mockShowUsuarioList);
      expect(usuarioRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve retornar lista vazia', async () => {
      (usuarioRepository.find as jest.Mock).mockResolvedValueOnce([]);
      const usuarios = await usuarioService.readUsuario();

      expect(usuarios).toEqual([]);
      expect(usuarioRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro', async () => {
      (usuarioRepository.find as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar usuarios'));

      await expect(usuarioService.readUsuario()).rejects.toThrow('Erro ao buscar usuarios');
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuario', async () => {
      const mockUsuario = mockUsuarioList[0];
      (usuarioRepository.findOne as jest.Mock).mockResolvedValueOnce(mockUsuario);

      const usuario = await usuarioService.buscaPorEmail(mockUsuario.email);

      expect(usuario).toEqual(mockUsuario);
      expect(usuarioRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro se usuario não for encontrado', async () => {
      (usuarioRepository.findOne as jest.Mock).mockResolvedValueOnce(undefined);

      await expect(usuarioService.buscaPorEmail(mockUsuarioList[0].email)).rejects.toThrow('Usuario não encontrado');
    });

    it('deve retornar um erro', async () => {
      (usuarioRepository.findOne as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar usuario'));

      await expect(usuarioService.buscaPorEmail(mockUsuarioList[0].email)).rejects.toThrow('Erro ao buscar usuario');
    });
  });

  describe('createUsuario', () => {
    it('deve criar um novo usuario', async () => {
      const usuario = mockUsuarioList[0];
      await usuarioService.createUsuario(usuario);

      expect(usuarioRepository.save).toHaveBeenCalledWith(usuario);
    });

    it('deve retornar um erro', async () => {
      (usuarioRepository.save as jest.Mock).mockRejectedValueOnce(new Error('Erro ao salvar usuario'));

      await expect(usuarioService.createUsuario(mockUsuarioList[0])).rejects.toThrow('Erro ao salvar usuario');
    });
  });

  describe('updateUsuario', () => {
    it('deve atualizar um usuario', async () => {
      const usuario = mockUsuarioList[0];
      await usuarioService.updateUsuario(usuario.id, usuario);

      expect(usuarioRepository.update).toHaveBeenCalledWith(usuario.id, usuario);
    });

    it('deve retornar um erro', async () => {
      (usuarioRepository.update as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar usuario'));

      await expect(usuarioService.updateUsuario(mockUsuarioList[0].id, mockUsuarioList[0])).rejects.toThrow('Erro ao atualizar usuario');
    });
  });

  describe('deleteUsuario', () => {
    it('deve deletar um usuario', async () => {
      const usuario = mockUsuarioList[0];
      await usuarioService.deleteUsuario(usuario.id);

      expect(usuarioRepository.delete).toHaveBeenCalledWith(usuario.id);
    });

    it('deve retornar um erro', async () => {
      (usuarioRepository.delete as jest.Mock).mockRejectedValueOnce(new Error('Erro ao deletar usuario'));

      await expect(usuarioService.deleteUsuario(mockUsuarioList[0].id)).rejects.toThrow('Erro ao deletar usuario');
    });
  });
});
