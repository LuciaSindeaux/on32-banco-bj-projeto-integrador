import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContasController } from '../../adaptadores/controladores/contas.controller';
import { ContasService } from '../../dominio/servicos/contas.service';
import { ContaBancaria } from './entities/Conta.entity';
import { ContaCorrente } from './entities/ContaCorrente.entity';
import { ContaPoupanca } from './entities/ContaPoupanca.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ContasRepository } from 'src/infraestrutura/repositories/contas.repository';
import { TransacoesModule } from '../transacoes/transacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContaBancaria, ContaCorrente, ContaPoupanca, Cliente]),
    TransacoesModule,
  ],
  controllers: [ContasController],
  providers: [ContasService, ContasRepository],
  exports: [ContasRepository]
})
export class ContasModule {}