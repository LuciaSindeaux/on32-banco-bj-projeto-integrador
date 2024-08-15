import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContasController } from '../../adaptadores/controladores/contas.controller';
import { ContasService } from '../../dominio/servicos/contas.service';
import { ContaBancaria } from './entities/Conta.entity';
import { ContaCorrente } from './entities/ContaCorrente.entity';
import { ContaPoupanca } from './entities/ContaPoupanca.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContaBancaria, ContaCorrente, ContaPoupanca, Cliente]),
  ],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
