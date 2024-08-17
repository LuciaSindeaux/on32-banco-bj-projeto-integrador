import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transacao } from '../transacoes/entities/transacao.entity';
import { ContaBancaria } from '../contas/entities/conta.entity';
import { TipoTransacao } from '../enums/tipo-transacao-enum';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,

    @InjectRepository(ContaBancaria)
    private readonly contaRepository: Repository<ContaBancaria>,
  ) {}

  async depositar(contaId: string, valor: number): Promise<Transacao> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId } });

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    conta.saldo += valor;

    const transacao = this.transacaoRepository.create({
      valor,
      tipo: TipoTransacao.DEPOSITO,
      data: new Date(),
      conta,
    });

    await this.contaRepository.save(conta);
    return this.transacaoRepository.save(transacao);
  }

  async sacar(contaId: string, valor: number): Promise<Transacao> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId } });

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    if (conta.saldo < valor) {
      throw new Error('Saldo insuficiente');
    }

    conta.saldo -= valor;

    const transacao = this.transacaoRepository.create({
      valor,
      tipo: TipoTransacao.SAQUE,
      data: new Date(),
      conta,
    });

    await this.contaRepository.save(conta);
    return this.transacaoRepository.save(transacao);
  }

  async transferir(
    contaOrigemId: string,
    contaDestinoId: string,
    valor: number,
  ): Promise<Transacao> {
    const contaOrigem = await this.contaRepository.findOne({ where: { id: contaOrigemId } });
    const contaDestino = await this.contaRepository.findOne({ where: { id: contaDestinoId } });

    if (!contaOrigem) {
      throw new Error('Conta de origem não encontrada');
    }

    if (!contaDestino) {
      throw new Error('Conta de destino não encontrada');
    }

    if (contaOrigem.saldo < valor) {
      throw new Error('Saldo insuficiente na conta de origem');
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const transacao = this.transacaoRepository.create({
      valor,
      tipo: TipoTransacao.TRANSFERENCIA,
      data: new Date(),
      conta: contaOrigem,
      contaDestino,
    });

    await this.contaRepository.save(contaOrigem);
    await this.contaRepository.save(contaDestino);
    return this.transacaoRepository.save(transacao);
  }

  async getExtrato(contaId: string): Promise<Transacao[]> {
    const conta = await this.contaRepository.findOne({
      where: { id: contaId },
      relations: ['transacoes'],
    });

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    return conta.transacoes;
  }
}
