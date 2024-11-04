import { Test, TestingModule } from '@nestjs/testing';
import { HospedeController } from './hospede.controller';
import { HospedeService } from './hospede.service';
import { HospedeEntity } from './hospede.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHospedeDTO } from './dto/create-hospede.dto';
import { UpdateHospedeDTO } from './dto/update-hospede.dto';
import { HospedeRepository } from './hospede.repository';

describe('HospedeController', () => {
  let controller: HospedeController;
  let service: HospedeService;

  const mockHospede: HospedeEntity = {
    id: '1',
    nome: 'Test User',
    email: 'test@example.com',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    rua: 'Rua Teste',
    numero: 123,
    complemento: 'Apto 1',
    bairro: 'Bairro Teste',
    cidade: 'Cidade Teste',
    estado: 'SP',
    pais: 'Brasil',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    reserva: null
  };

  const mockHospedeService = {
    createHospede: jest.fn(),
    readHospede: jest.fn(),
    updateHospede: jest.fn(),
    deleteHospede: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospedeController],
      providers: [
        {
          provide: HospedeService,
          useValue: mockHospedeService,
        },
      ],
    }).compile();

    controller = module.get<HospedeController>(HospedeController);
    service = module.get<HospedeService>(HospedeService);
  });

  describe('createHospede', () => {
    it('deve criar um novo hóspede', async () => {
      const createHospedeDto: CreateHospedeDTO = {
        nome: mockHospede.nome,
        email: mockHospede.email,
        cpf: mockHospede.cpf,
        rg: mockHospede.rg,
        rua: mockHospede.rua,
        numero: mockHospede.numero,
        complemento: mockHospede.complemento,
        bairro: mockHospede.bairro,
        cidade: mockHospede.cidade,
        estado: mockHospede.estado,
        pais: mockHospede.pais,
      };

      jest.spyOn(service, 'createHospede').mockResolvedValue(undefined);

      const result = await controller.createHospede(createHospedeDto);

      expect(result.message).toBe('hospede criado com sucesso!');
      expect(service.createHospede).toHaveBeenCalled();
    });
  });

  describe('readHospede', () => {
    it('deve retornar lista de hóspedes', async () => {
      const hospedesList = [mockHospede];
      jest.spyOn(service, 'readHospede').mockResolvedValue(hospedesList);

      const result = await controller.readHospede();

      expect(result).toEqual(hospedesList);
      expect(service.readHospede).toHaveBeenCalled();
    });
  });

  describe('updateHospede', () => {
    it('deve atualizar um hóspede', async () => {
      const updateHospedeDto: UpdateHospedeDTO = {
          nome: 'Nome Atualizado',
          email: '',
          rg: '',
          cpf: '',
          rua: '',
          numero: 0,
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          pais: ''
      };

      jest.spyOn(service, 'updateHospede').mockResolvedValue(undefined);

      const result = await controller.updateHospede('1', updateHospedeDto);

      expect(result.message).toBe('hospede atualizado com sucesso!');
      expect(service.updateHospede).toHaveBeenCalledWith('1', updateHospedeDto);
    });
  });

  describe('deleteHospede', () => {
    it('deve deletar um hóspede', async () => {
      jest.spyOn(service, 'deleteHospede').mockResolvedValue(undefined);

      const result = await controller.deleteHospede('1');

      expect(result.message).toBe('hospede removido com sucesso!');
      expect(service.deleteHospede).toHaveBeenCalledWith('1');
    });
  });
});

describe('HospedeService', () => {
  let service: HospedeService;
  let repository: Repository<HospedeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HospedeService,
        {
          provide: getRepositoryToken(HospedeEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HospedeService>(HospedeService);
    repository = module.get<Repository<HospedeEntity>>(
      getRepositoryToken(HospedeEntity),
    );
  });

  describe('createHospede', () => {
    it('deve salvar um novo hóspede', async () => {
      const hospede = new HospedeEntity();
      jest.spyOn(repository, 'save').mockResolvedValue(hospede);

      await service.createHospede(hospede);

      expect(repository.save).toHaveBeenCalledWith(hospede);
    });
  });

  describe('readHospede', () => {
    it('deve retornar todos os hóspedes', async () => {
      const hospedesList = [new HospedeEntity()];
      jest.spyOn(repository, 'find').mockResolvedValue(hospedesList);

      const result = await service.readHospede();

      expect(result).toEqual(hospedesList);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('updateHospede', () => {
    it('deve atualizar um hóspede', async () => {
      const id = '1';
      const updateDto: UpdateHospedeDTO = {
          nome: 'Nome Atualizado',
          email: '',
          rg: '',
          cpf: '',
          rua: '',
          numero: 0,
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          pais: ''
      };
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      await service.updateHospede(id, updateDto);

      expect(repository.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('deleteHospede', () => {
    it('deve deletar um hóspede', async () => {
      const id = '1';
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.deleteHospede(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});

describe('HospedeRepository', () => {
  let repository: HospedeRepository;

  beforeEach(() => {
    repository = new HospedeRepository();
  });

  const mockHospede: HospedeEntity = {
    id: '1',
    nome: 'Test User',
    email: 'test@example.com',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    rua: 'Rua Teste',
    numero: 123,
    complemento: 'Apto 1',
    bairro: 'Bairro Teste',
    cidade: 'Cidade Teste',
    estado: 'SP',
    pais: 'Brasil',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    reserva: null
  };

  describe('createUsuario', () => {
    it('deve criar um novo hóspede', async () => {
      await repository.createUsuario(mockHospede);
      const hospedes = await repository.readUsuario();
      expect(hospedes).toContain(mockHospede);
    });
  });

  describe('existwithEmail', () => {
    it('deve retornar true se email já existe', async () => {
      await repository.createUsuario(mockHospede);
      const exists = await repository.existwithEmail(mockHospede.email);
      expect(exists).toBeTruthy();
    });

    it('deve retornar false se email não existe', async () => {
      const exists = await repository.existwithEmail('naoexiste@example.com');
      expect(exists).toBeFalsy();
    });
  });

  describe('existwithCPF', () => {
    it('deve retornar true se CPF já existe', async () => {
      await repository.createUsuario(mockHospede);
      const exists = await repository.existwithCPF(mockHospede.cpf);
      expect(exists).toBeTruthy();
    });
  });

  describe('existwithRG', () => {
    it('deve retornar true se RG já existe', async () => {
      await repository.createUsuario(mockHospede);
      const exists = await repository.existwithRG(mockHospede.rg);
      expect(exists).toBeTruthy();
    });
  });

  describe('updateUsuario', () => {
    it('deve atualizar um hóspede existente', async () => {
      await repository.createUsuario(mockHospede);
      const updateData = { nome: 'Nome Atualizado' };
      const updated = await repository.updateUsuario(mockHospede.id, updateData);
      expect(updated.nome).toBe(updateData.nome);
    });

    it('deve lançar erro ao tentar atualizar hóspede inexistente', async () => {
      await expect(
        repository.updateUsuario('id-inexistente', { nome: 'Teste' })
      ).rejects.toThrow('Hóspede não existe!');
    });
  });

  describe('deleteUsuario', () => {
    it('deve deletar um hóspede existente', async () => {
      await repository.createUsuario(mockHospede);
      await repository.deleteUsuario(mockHospede.id);
      const hospedes = await repository.readUsuario();
      expect(hospedes).not.toContain(mockHospede);
    });

    it('deve lançar erro ao tentar deletar hóspede inexistente', async () => {
      await expect(
        repository.deleteUsuario('id-inexistente')
      ).rejects.toThrow('Hóspede nao existe');
    });
  });
});