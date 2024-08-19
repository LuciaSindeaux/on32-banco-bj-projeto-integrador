import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaBancaria } from '../../dominios/contas/entities/Conta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContasRepository {
  constructor(
    @InjectRepository(ContaBancaria)
    private readonly ContasRepository: Repository<ContaBancaria>,
  ) {}

  async findAll(): Promise<ContaBancaria[]> {
    return await this.ContasRepository.find();
  }

  async save(conta: ContaBancaria): Promise<ContaBancaria> {
    return await this.ContasRepository.save(conta);
}
}
