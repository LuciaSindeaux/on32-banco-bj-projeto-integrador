import { Injectable } from '@nestjs/common';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ClienteRepository } from '../../infraestrutura/repositorios/clientes.repository';
import { ContaBancaria } from '../contas/entities/conta.entity';
import { TipoConta } from '../enums/tipo-conta-enum';
import { Repository } from 'typeorm';
import { ContaCorrente } from '../contas/entities/contaCorrente.entity';
import { ContaPoupanca } from '../contas/entities/contaPoupanca.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente):   
 Promise<Cliente> {
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();   

  }

  async findOne(id: string): Promise<Cliente> {
    return await this.clienteRepository.findOne({   
 where: { id } });
  }

  async update(id: string, cliente: Cliente): Promise<Cliente> {
    const existingCliente = await this.clienteRepository.findOne({ where: { id } });
    if (!existingCliente) {
      throw new   
 Error('Cliente não encontrado!');
    }

    Object.assign(existingCliente, cliente);

    return await this.clienteRepository.save(existingCliente);
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }

  async abrirConta(clienteId: string, tipoConta: TipoConta): Promise<ContaBancaria> {
    const cliente = await this.findOne(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado!');
    }

    let novaConta: ContaBancaria;
    
    if (tipoConta === TipoConta.CORRENTE) {
      novaConta = new ContaCorrente();
    } else if (tipoConta === TipoConta.POUPANCA) {
      novaConta = new ContaPoupanca();
    } else {
      throw new Error('Tipo de conta inválido.');
    }

    cliente.contas.push(novaConta);
    await this.clienteRepository.save(cliente);

    return novaConta;
  }

  async fecharConta(clienteId: string, contaId: string): Promise<void> {
    const cliente = await this.findOne(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado!');
    }

    cliente.contas = cliente.contas.filter((c) => c.id !== contaId);
    await this.clienteRepository.save(cliente);
  }

  async mudarTipoConta(
    clienteId: string,
    contaId: string,
    novoTipo: TipoConta,
  ): Promise<void> {
    const cliente = await this.findOne(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado!');
    }
  
    const conta = cliente.contas.find((conta) => conta.id === contaId);
    if (!conta) {
      throw new Error('Conta não encontrada!');
    }
    if (novoTipo === TipoConta.CORRENTE) {
      conta.tipo = TipoConta.CORRENTE;
    } else if (novoTipo === TipoConta.POUPANCA) {
      conta.tipo = TipoConta.POUPANCA;
    } else {
      throw new Error('Tipo de conta inválido.');
    }
  
    await this.clienteRepository.save(cliente);
  }
}