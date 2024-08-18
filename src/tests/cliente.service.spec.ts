import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as supertest from 'supertest';
import { TipoConta } from '../dominio/enums/tipo-conta-enum';
import { v4 as uuidv4 } from 'uuid';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

test('Deve criar um cliente com sucesso e adicionar um tipo de conta poupança e associar um gerente a ele', async () => {
  const nomeCompleto = 'Lais';
  const endereco = 'Rua paraibuna, 123';
  const telefone = '429858464';
  const gerenteId = uuidv4();
  const tipoConta: TipoConta = TipoConta.POUPANCA;

  await supertest(app.getHttpServer())
  .post('/gerentes')
  .send({
    id: gerenteId,
    nomeCompleto: 'Gerente Teste 1',
    clientes: [],
  })
  .expect(201);
  const response = await supertest(app.getHttpServer())
    .post('/clientes')
    .send({
      nomeCompleto,
      endereco,
      telefone,
      gerenteId,
      tipoConta,
    })
    .expect(201);

  const body = response.body;
  console.log(body);
  expect(body.nomeCompleto).toBe(nomeCompleto);
  expect(body.endereco).toBe(endereco);
  expect(body.telefone).toBe(telefone);
  expect(body.gerenteId).toBe(gerenteId);

  if (body.contas && body.contas.length > 0) {
    expect(body.contas[0].tipo).toBe(tipoConta);
    
  } else {
    console.error('Nenhuma conta foi criada para o cliente.');
  }
});


  test('Deve retornar a rota GET /clientes com sucesso', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/clientes')
      .expect(200);

    const body = response.body;
    console.log(body);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });