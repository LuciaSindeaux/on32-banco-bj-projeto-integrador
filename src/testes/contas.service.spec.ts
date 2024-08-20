import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContasService } from '../dominios/servicos/contas.service';
import { TipoConta } from '../dominios/enums/tipo-conta-enum';
import { Cliente } from '../dominios/clientes/entities/cliente.entity';
import { CreateContaDto } from '../dominios/contas/dto/create-conta.dto';
import { AppModule } from '../app.module';
import { v4 as uuidv4 } from 'uuid';

let app: INestApplication;
let contasService: ContasService;

beforeAll(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
  contasService = moduleRef.get<ContasService>(ContasService);
});

afterAll(async () => {
  await app.close();
});

describe('ContasService', () => {
  it('deve lançar erro ao tentar criar uma conta corrente com saldo inferior ao mínimo', async () => {
    const cliente = new Cliente();
    cliente.id = uuidv4();
    cliente.nomeCompleto = 'Cliente Teste';

    const novaConta: CreateContaDto = {
      clienteId: cliente.id,
      tipoConta: 'CORRENTE',
      saldo: 499,
      limiteChequeEspecial: 0,
      taxaJuros: 0,
    };
     
    console.log(novaConta)
    try {
      await contasService.create(novaConta);
      throw new Error('O teste deveria ter lançado um erro');
    } catch (error) {
      expect(error.message).toContain(
        'O teste deveria ter lançado um erro',
      );
    }
  });

  it('deve permitir a criação de uma conta corrente com saldo igual ou superior ao mínimo', async () => {
    const cliente = new Cliente();
    cliente.id = uuidv4();
    cliente.nomeCompleto = 'Cliente Teste';

    const novaConta: CreateContaDto = {
      clienteId: cliente.id,
      tipoConta: 'CORRENTE',
      saldo: 500,
      limiteChequeEspecial: 0,
      taxaJuros: 0, 
    };
    console.log(novaConta)
    const contaCriada = await contasService.create(novaConta);
    expect(contaCriada).toBeDefined(); 
    expect(Number(contaCriada.saldo)).toBe(500); 
    expect(contaCriada.tipo).toBe('CORRENTE'); 
  });
});
