import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gerente } from '../dominio/gerentes/entities/gerente.entity';
import { Cliente } from '../dominio/clientes/entities/cliente.entity';
import { GerenteRepository } from '../infraestrutura/repositories/gerentes.repository';
import { AppModule } from '../app.module';
import { GerenteModule } from '../dominio/gerentes/gerente.module';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';

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
            nomeCompleto: 'Cliente Teste'
        };
    
        const gerente = {
            id: 'gerente-uuid',
            nomeCompleto: 'Gerente Teste',
            clientes: [cliente]
        };
    
        const response = await supertest(app.getHttpServer())
            .post('/gerentes')
            .send(gerente) 
            .expect(201);
    
        const body = response.body;
        expect(body).toHaveProperty('id');
        expect(body.nomeCompleto).toBe(gerente.nomeCompleto);
        expect(body.clientes).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: cliente.id })
        ]));
    });
}); 


