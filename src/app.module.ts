import { Module } from '@nestjs/common';
import { ClienteModule } from './domain/clientes/cliente.module';
import { GerenteModule } from './domain/gerentes/gerente.module';
import { ContasModule } from './domain/contas/contas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './domain/clientes/entities/cliente.entity';
import { Gerente } from './domain/gerentes/entities/gerente.entity';
import { ContaBancaria } from './domain/contas/entities/conta.entity';
import { ClienteService } from './domain/clientes/services/cliente.service';
import { ClienteRepository } from './infrastructure/repositories/clientes.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '140694',
      database: 'banco',
      entities: [Gerente, Cliente, ContaBancaria],
      synchronize: true,
    }),
    ClienteModule,
    GerenteModule,
    ContasModule,
  ],
})
export class AppModule {}
