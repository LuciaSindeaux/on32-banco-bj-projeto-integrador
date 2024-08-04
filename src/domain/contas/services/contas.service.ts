import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ContaBancaria } from '../entities/conta.entity';
import { CreateContaDto } from '../dto/create-conta.dto';
import { UpdateContaDto } from '../dto/update-conta.dto';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(ContaBancaria)
    private readonly contaRepository: Repository<ContaBancaria>,
  ) {}

  async create(createContaDto: CreateContaDto): Promise<ContaBancaria> {
    const conta = this.contaRepository.create(createContaDto as DeepPartial<ContaBancaria>);
    return await this.contaRepository.save(conta);
  }

  async findAll(): Promise<ContaBancaria[]> {
    return await this.contaRepository.find();
  }

  async findOne(id: string): Promise<ContaBancaria> {
    return await this.contaRepository.findOne({ where: { id } });
  }

  async update(id: string, updateContaDto: UpdateContaDto): Promise<ContaBancaria> {
    await this.contaRepository.update(id, updateContaDto as DeepPartial<ContaBancaria>);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.contaRepository.delete(id);
  }

  async depositar(id: string, valor: number): Promise<void> {
    const conta = await this.findOne(id);
    if (!conta) {
      throw new Error('Conta não encontrada!');
    }
    conta.saldo += valor;
    await this.contaRepository.save(conta);
  }

  async sacar(id: string, valor: number): Promise<void> {
    const conta = await this.findOne(id);
    if (!conta) {
      throw new Error('Conta não encontrada!');
    }
    let saldoDisponivel = conta.saldo;
    if (conta) {
      saldoDisponivel += conta.limiteChequeEspecial || 0;
    }
    if (valor <= saldoDisponivel) {
      conta.saldo -= valor;
      await this.contaRepository.save(conta);
    } else {
      throw new Error('Saldo insuficiente para saque.');
    }
  }

  async transferir(id: string, valor: number, contaDestinoId: string): Promise<void> {
      const conta = await this.findOne(id);
      if (!conta) {
        throw new Error('Conta não encontrada!');
      }
      const contaDestino = await this.findOne(contaDestinoId);
      if (!contaDestino) {
        throw new Error('Conta de destino não encontrada!');
      }
  
      let saldoDisponivel = conta.saldo;
      if (conta) {
        saldoDisponivel += conta.limiteChequeEspecial || 0;
      }
  
      if (valor <= saldoDisponivel) {
        conta.saldo -= valor;
        contaDestino.saldo += valor;
        await this.contaRepository.save(conta);
        await this.contaRepository.save(contaDestino);
      } else {
        throw new Error('Saldo insuficiente para transferência.');
      }
    }

  async verificarSaldo(id: string): Promise<number> {
    const conta = await this.findOne(id);
    if (!conta) {
      throw new Error('Conta não encontrada!');
    }
    return conta.saldo;
  }
}
