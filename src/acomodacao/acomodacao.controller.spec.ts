import { Test, TestingModule } from '@nestjs/testing';
import { AcomodacaoController } from './acomodacao.controller';
import { AcomodacaoService } from './acomodacao.service';
import { AcomodacaoRepository } from './acomodacao.repository';
import { AcomodacaoEntity } from './acomodacao.entity';
import { CreateAcomodacaoFormDataDTO } from './dto/CreateAcomodacaoFormData.dto';
import { UpdateAcomodacaoDTO } from './dto/UpdateAcomodacao.dto';

describe('AcomodacaoController', () => {
  let controller: AcomodacaoController;
  let service: AcomodacaoService;
  let repository: AcomodacaoRepository;

  const mockAcomodacao = {
    id: '1',
    nome: 'Suíte Master',
    numero: 101,
    capacidade: 2,
    quantidadeCamas: 1,
    tipoCama: 'King Size',
    tipoBanheiro: 'Privativo',
    comChuveiro: true,
    comBanheira: true,
    comToalhas: true,
    comSecador: true,
    comAcessibilidade: true,
    comCozinha: false,
    comRestaurante: true,
    comArCondicionado: true,
    comAquecedor: false,
    comTV: true,
    tamanhoTV: 42,
    comWifi: true,
    comFrigobar: true,
    comCofre: true,
    comVaranda: true,
    descricao: 'Linda suíte com vista para o mar',
    preco: 500.00,
    fotos: []
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcomodacaoController],
      providers: [
        {
          provide: AcomodacaoService,
          useValue: {
            createAcomodacao: jest.fn().mockResolvedValue(mockAcomodacao),
            readAcomodacao: jest.fn().mockResolvedValue([mockAcomodacao]),
            updateAcomodacao: jest.fn().mockResolvedValue(mockAcomodacao),
            deleteAcomodacao: jest.fn().mockResolvedValue(mockAcomodacao),
          },
        },
        {
          provide: AcomodacaoRepository,
          useValue: {
            createAcomodacao: jest.fn(),
            readAcomodacao: jest.fn(),
            updateAcomodacao: jest.fn(),
            deleteAcomodacao: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AcomodacaoController>(AcomodacaoController);
    service = module.get<AcomodacaoService>(AcomodacaoService);
    repository = module.get<AcomodacaoRepository>(AcomodacaoRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAcomodacao', () => {
    it('should create a new acomodacao', async () => {
      const createDto: CreateAcomodacaoFormDataDTO = {
        nome: 'Suíte Master',
        numero: 101,
        capacidade: 2,
        quantidadeCamas: 1,
        tipoCama: 'King Size',
        tipoBanheiro: 'Privativo',
        comChuveiro: true,
        comBanheira: true,
        comToalhas: true,
        comSecador: true,
        comAcessibilidade: true,
        comCozinha: false,
        comRestaurante: true,
        comArCondicionado: true,
        comAquecedor: false,
        comTV: true,
        tamanhoTV: 42,
        comWifi: true,
        comFrigobar: true,
        comCofre: true,
        comVaranda: true,
        descricao: 'Linda suíte com vista para o mar',
        preco: 500.00
      };

      const result = await controller.createAcomodacao(createDto, []);
      expect(result.message).toBe('acomodação criada com sucesso!');
      expect(result.acomodacao).toBeDefined();
    });
  });

  describe('readAcomodacao', () => {
    it('should return all acomodacoes', async () => {
      const result = await controller.readAcomodacao();
      expect(result).toEqual([mockAcomodacao]);
      expect(service.readAcomodacao).toHaveBeenCalled();
    });
  });
});