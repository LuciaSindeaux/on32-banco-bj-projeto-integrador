import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Casos de testes, gerentes.', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Deve criar um gerente e associar um cliente', async () => {
    const cliente = {
      id: 'cliente-uuid',
      nomeCompleto: 'Cliente Teste',
      endereco: 'Endereço Teste',
      telefone: 'telefone Teste',
    };

    const gerente = {
      id: 'gerente-uuid',
      nomeCompleto: 'Gerente Teste',
      clientes: [cliente],
    };

    const responseGerente = await request(app.getHttpServer())
      .post('/gerentes')
      .send(gerente)
      .expect(201);

    const responseCliente = await request(app.getHttpServer())
      .post('/clientes')
      .send(cliente)
      .expect(201);

    const bodyGerente = responseGerente.body;
    const bodyCliente = responseCliente.body;

    await request(app.getHttpServer())
      .post(`/gerentes/${bodyGerente.id}/clientes`)
      .send({ clienteId: bodyCliente.id })
      .expect(200);

    expect(bodyGerente.nomeCompleto).toBe(gerente.nomeCompleto);
    expect(bodyCliente.nomeCompleto).toBe(cliente.nomeCompleto);
  });
});
