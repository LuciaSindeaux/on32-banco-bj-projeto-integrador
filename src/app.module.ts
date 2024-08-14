import { Module } from '@nestjs/common';
import { ClienteModule } from './domain/clientes/cliente.module';
import { GerenteModule } from './domain/gerentes/gerente.module';
import { ContasModule } from './domain/contas/contas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './domain/clientes/entities/cliente.entity';
import { Gerente } from './domain/gerentes/entities/gerente.entity';
import { ContaBancaria } from './domain/contas/entities/conta.entity';
import { Transacoes } from './domain/transacoes/entities/transacoes.entity';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String (process.env.DB_PASSWORD),
      database: process.env.DB_DATABASE,
      entities: [Gerente, Cliente, ContaBancaria, Transacoes],
      synchronize: true,
    }),
    ClienteModule,
    GerenteModule,
    ContasModule,
  ],
})
export class AppModule {}
