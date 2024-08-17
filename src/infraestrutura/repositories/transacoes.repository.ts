import { Repository } from 'typeorm';
import { Transacao } from 'src/dominio/transacoes/entities/transacao.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransacaoRepository {
  constructor(
    @InjectRepository(Transacao)
    private readonly TransacaoRepository: Repository<Transacao>,
  ) {}

  async createTransacao(transacao: Transacao): Promise<Transacao> {
    return await this.TransacaoRepository.save(transacao);
  }

  async deleteTransacao(id: number): Promise<void> {
    await this.TransacaoRepository.delete(id);
  }
}
