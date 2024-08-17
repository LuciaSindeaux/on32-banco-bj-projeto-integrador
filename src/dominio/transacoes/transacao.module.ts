import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from '../transacoes/entities/transacao.entity';
import { TransacaoService } from '../servicos/transacao.service';
import { ContaBancaria } from '../contas/entities/conta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao, ContaBancaria])],
  providers: [TransacaoService],
  exports: [TransacaoService], 
})
export class TransacoesModule {}