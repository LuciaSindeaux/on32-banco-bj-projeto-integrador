import { Module } from '@nestjs/common';
import { ClienteModule } from './dominio/clientes/cliente.module';
import { GerenteModule } from './dominio/gerentes/gerente.module';
import { ContasModule } from './dominio/contas/contas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './dominio/clientes/entities/cliente.entity';
import { Gerente } from './dominio/gerentes/entities/gerente.entity';
import { ContaBancaria } from './dominio/contas/entities/conta.entity';
import { Transacao } from './dominio/transacoes/entities/transacao.entity';

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
      entities: [Gerente, Cliente, ContaBancaria, Transacao],
      synchronize: true,
    }),
    ClienteModule,
    GerenteModule,
    ContasModule,
  ],
})
export class AppModule {}
