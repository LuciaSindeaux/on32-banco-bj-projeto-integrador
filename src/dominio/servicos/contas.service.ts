import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaBancaria } from '../contas/entities/conta.entity';
import { CreateContaDto } from '../contas/dto/create-conta.dto';
import { UpdateContaDto } from '../contas/dto/update-conta.dto';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(ContaBancaria)
    private readonly contaRepository: Repository<ContaBancaria>,
  ) {}

  async create(createContaDto: CreateContaDto): Promise<ContaBancaria> {
    const conta = this.contaRepository.create(createContaDto);
    return await this.contaRepository.save(conta);
  }

  async findAll(): Promise<ContaBancaria[]> {
    return await this.contaRepository.find();
  }

  async findOne(id: string): Promise<ContaBancaria> {
    return await this.contaRepository.findOne({ where: { id } });
  }

  async update(id: string, updateContaDto: UpdateContaDto): Promise<ContaBancaria> {
    await this.contaRepository.update(id, updateContaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.contaRepository.delete(id);
  }
}