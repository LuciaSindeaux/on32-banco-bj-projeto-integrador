import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as supertest from 'supertest';
import { Cliente } from 'src/domain/clientes/entities/cliente.entity';
import { TipoConta } from '../domain/enums/tipo-conta-enum';

describe('Criar cliente', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('Deve criar um cliente com sucesso e adicionar um tipo de conta poupança e associar um gerente ele', async () => {
    const nomeCompleto = 'Lais';
    const endereco = 'Rua paraibuna, 123';
    const telefone = '429858464';
    const gerente = 'João';
    const tipoConta = TipoConta.POUPANCA;

    const response = await supertest(app.getHttpServer())
      .post('/clientes')
      .send({
        nomeCompleto,
        endereco,
        telefone,
        gerente,
        tipoConta,
      })
      .expect(201);

    const body = response.body;
    console.log(body);
    expect(body.nomeCompleto).toBe(nomeCompleto);
    expect(body.endereco).toBe(endereco);
    expect(body.telefone).toBe(telefone);
    expect(body.gerente.nomeCompleto).toBe(gerente);
    expect(body.contas[0].tipoConta).toBe(tipoConta);
  });

  test('Deve retornar uma lista de clientes', async () => {
    const cliente1 = {
      nomeCompleto: 'Teste Cliente 1',
      endereco: 'Endereço Teste 1',
      telefone: 'Telefone Teste 1',
      gerente: {
        nomeCompleto: 'Gerente Teste 1',
      },
      contas: [
        {
          tipoConta: TipoConta.CORRENTE,
        },
      ],
    };
    const cliente2 = {
      nomeCompleto: 'Teste Cliente 2',
      endereco: 'Endereço Teste 2',
      telefone: 'Telefone Teste 2',
      gerente: {
        nomeCompleto: 'Gerente Teste 2',
      },
      contas: [
        {
          tipoConta: TipoConta.POUPANCA,
        },
      ],
    };
    await supertest(app.getHttpServer())
      .post('/clientes')
      .send(cliente1)
      .expect(201);
    await supertest(app.getHttpServer())
      .post('/clientes')
      .send(cliente2)
      .expect(201);
    const response = await supertest(app.getHttpServer())
      .get('/clientes')
      .expect(200);
    const clientes: Cliente[] = response.body;
    console.log(clientes);
    expect(clientes).toBeInstanceOf(Array);
    expect(clientes.length).toBeGreaterThan(0);
    clientes.forEach((cliente) => {
      expect(cliente).toHaveProperty('endereco');
      expect(cliente).toHaveProperty('nomeCompleto');
      expect(cliente).toHaveProperty('telefone');
      expect(cliente).toHaveProperty('contas');
      expect(cliente.contas[0]).toHaveProperty('tipoConta');
      expect(cliente.gerenteId).toHaveProperty('nomeCompleto');
    });
  });
});
