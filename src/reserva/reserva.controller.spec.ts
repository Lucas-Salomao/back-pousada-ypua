import { CreateReservaFormDataDTO } from './dto/create-reserva-formdata.dto';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { CreateReservaDTO } from './dto/create-reserva.dto';
import { StatusReserva } from './enum/StatusReserva.enum';
import { UpdateReservaDTO } from './dto/update-reserva.dto';

describe('ReservaController', () => {
  let reservaController: ReservaController;
  let reservaService: ReservaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaController],
      providers: [
        {
          provide: ReservaService,
          useValue: {
            createReserva: jest.fn(),
            readReserva: jest.fn(),
            updateReserva: jest.fn(),
            deleteReserva: jest.fn(),
            findReservaByName: jest.fn(),
            findReservaByCpf: jest.fn(),
          }
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          }
        },
      ],
    }).compile();

    reservaController = module.get<ReservaController>(ReservaController);
    reservaService = module.get<ReservaService>(ReservaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve estar implementado', () => {
    expect(reservaController).toBeDefined();
    expect(reservaService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('deve criar uma nova reserva', async () => {
    const reserva: CreateReservaFormDataDTO = {
      usuarioId: '1',
      dataEntrada: '2021-10-10',
      dataSaida: '2021-10-15',
      status: StatusReserva.RESERVADO,
      valorTotal: '1000',
      acomodacaoId: '1',
      hospedeIds: ['1', '2'],
    };

    await reservaController.createReserva(reserva);

    expect(reservaService.createReserva).toHaveBeenCalledWith(reserva);
  });

  it('deve listar todas as reservas', async () => {
    await reservaController.readReserva();

    expect(reservaService.readReserva).toHaveBeenCalled();
  });

  it('deve atualizar uma reserva', async () => {
    const reserva: UpdateReservaDTO = {
      codigo: '12345678',
      usuarioId: '1',
      dataEntrada: '2021-10-10',
      dataSaida: '2021-10-15',
      status: StatusReserva.RESERVADO,
      valorTotal: 1000,
    };

    await reservaController.updateReserva('1', reserva);

    expect(reservaService.updateReserva).toHaveBeenCalledWith('1', reserva);
  });

  it('deve deletar uma reserva', async () => {
    await reservaController.deleteReserva('1');

    expect(reservaService.deleteReserva).toHaveBeenCalledWith('1');
  });

  it('deve buscar uma reserva pelo nome', async () => {
    await reservaController.findReservaByName('nome');

    expect(reservaService.findReservaByName).toHaveBeenCalledWith('nome');
  });

  it('deve buscar uma reserva pelo cpf', async () => {
    await reservaController.findReservaByCpf('cpf');

    expect(reservaService.findReservaByCpf).toHaveBeenCalledWith('cpf');
  });

});
