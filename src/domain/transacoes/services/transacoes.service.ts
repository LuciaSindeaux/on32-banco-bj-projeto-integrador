import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaBancaria   
 } from '../../contas/entities/Conta.entity';
import { Transacoes } from '../entities/transacoes.entity';
import { CreateTransacaoDto } from '../../../Application/dtos/transacoes/create-transacao';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectRepository(Transacoes)
    private readonly transacoesRepository: Repository<Transacoes>,
    @InjectRepository(ContaBancaria)
    private readonly contaRepository: Repository<ContaBancaria>,
  ) {}

  async registrarTransacao(contaId: string, createTransacaoDto: CreateTransacaoDto): Promise<Transacoes> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId } });

    if (!conta) {
      throw new Error('Conta não encontrada!');
    }

    const transacao = new Transacoes();
    transacao.tipo = createTransacaoDto.tipo;
    transacao.valor = createTransacaoDto.valor;
    transacao.data = new Date();
    transacao.conta = conta;

    return await this.transacoesRepository.save(transacao);
  }

  async consultarExtrato(contaId: string): Promise<Transacoes[]> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId }, relations: ['transacoes'] });
    if (!conta) {
      throw new Error('Conta não encontrada!');
    }
    return conta.transacoes;
  }

  async deleteTransacao(id: string): Promise<void> {
    await this.transacoesRepository.delete(id);
  }


}