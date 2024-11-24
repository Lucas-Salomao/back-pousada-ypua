import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUsuarioDTO } from './dto/CreateUsuario.dto';
import { ShowUsuarioDTO } from './dto/ShowUsuario.dto';
import { UpdateUsuarioDTO } from './dto/UpdateUsuario.dto';

describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            createUsuario: jest.fn(),
            readUsuario: jest.fn(),
            updateUsuario: jest.fn(),
            deleteUsuario: jest.fn(),
          }
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          }
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          }
        },
      ],
    }).compile();

    usuarioController = module.get<UsuarioController>(UsuarioController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('deve estar implementado', () => {
    expect(usuarioController).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
  });

  // createUsuario
  it('deve criar um novo usuario', async () => {
    const usuario: CreateUsuarioDTO = {
      nome: 'teste',
      email: 'user@mail.com',
      senha: '123456',
      cpf: '12345678901',
      rg: '123456789',
      rua: 'teste',
      numero: 123,
      complemento: 'teste',
      bairro: 'teste',
      cidade: 'teste',
      estado: 'teste',
      pais: 'teste',
      role: 'teste'
    };

    const expectedResponse: ShowUsuarioDTO = {
      ...usuario,
      id: expect.any(String),
    };

    await usuarioController.createUsuario(usuario, '123456');

    expect(usuarioService.createUsuario).toHaveBeenCalledWith(expectedResponse);
  });

  // readUsuario
  it('deve retornar todos os usuarios', async () => {
    await usuarioController.readUsuario();

    expect(usuarioService.readUsuario).toHaveBeenCalled();
  });

  // updateUsuario
  it('deve atualizar um usuario', async () => {
    const usuario: UpdateUsuarioDTO = {
      nome: 'teste',
      email: 'user@mail.com',
      senha: '123456',
      cpf: '12345678901',
      rg: '123456789',
      rua: 'teste',
      numero: 123,
      complemento: 'teste',
      bairro: 'teste',
      cidade: 'teste',
      estado: 'teste',
      pais: 'teste',
      role: 'teste',
      id: expect.any(String),
    };

    await usuarioController.updateUsuario('123', usuario);

    expect(usuarioService.updateUsuario).toHaveBeenCalledWith('123', usuario);
  });

  // deleteUsuario
  it('deve deletar um usuario', async () => {
    await usuarioController.deleteUsuario('123');

    expect(usuarioService.deleteUsuario).toHaveBeenCalledWith('123');
  });
});
