import { Repository } from 'typeorm';
import { Transacoes } from '../../dominio/transacoes/entities/transacoes.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransacoesRepository {
  constructor(
    @InjectRepository(Transacoes)
    private readonly TransacoesRepository: Repository<Transacoes>,
  ) {}

  async createTransacao(transacao: Transacoes): Promise<Transacoes> {
    return await this.TransacoesRepository.save(transacao);
  }

  async deleteTransacao(id: number): Promise<void> {
    await this.TransacoesRepository.delete(id);
  }
}
