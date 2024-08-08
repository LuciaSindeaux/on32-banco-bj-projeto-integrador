// src/domain/services/gerente.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../gerentes/entities/gerente.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ContaCorrente } from '../contas/entities/contaCorrente.entity';
import { ContaPoupanca } from '../contas/entities/contaPoupanca.entity';
import { TipoConta } from '../enums/tipo-conta-enum';

@Injectable()
export class GerenteService {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async listarGerentes(): Promise<Gerente[]> {
    return await this.gerenteRepository.find({ relations: ['clientes'] });
  }

  async adicionarGerente(gerenteData: Partial<Gerente>): Promise<Gerente> {
    const gerente = this.gerenteRepository.create(gerenteData);
    return await this.gerenteRepository.save(gerente);
  }

  async adicionarCliente(gerenteId: string, clienteData: Partial<Cliente>): Promise<Cliente> {
    const gerente = await this.gerenteRepository.findOne({ where: { id: gerenteId } });
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const cliente = this.clienteRepository.create(clienteData);
    cliente.gerente = gerente;
    return await this.clienteRepository.save(cliente);
  }

  async abrirConta(clienteId: string, tipoConta: TipoConta): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId }, relations: ['contas'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const conta = tipoConta === TipoConta.CORRENTE ? new ContaCorrente() : new ContaPoupanca();
    cliente.contas.push(conta);
    await this.clienteRepository.save(cliente);
  }

  async mudarTipoConta(clienteId: string, contaId: string, novoTipo: TipoConta): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId }, relations: ['contas'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const contaIndex = cliente.contas.findIndex(conta => conta.id === contaId);
    if (contaIndex === -1) {
      throw new Error('Conta não encontrada');
    }

    let novaConta;
    if (novoTipo === TipoConta.CORRENTE && !(cliente.contas[contaIndex] instanceof ContaCorrente)) {
      novaConta = new ContaCorrente();
    } else if (novoTipo === TipoConta.POUPANCA && !(cliente.contas[contaIndex] instanceof ContaPoupanca)) {
      novaConta = new ContaPoupanca();
    }

    if (novaConta) {
      cliente.contas[contaIndex] = novaConta;
      await this.clienteRepository.save(cliente);
    }
  }

  async encontrarGerentePorId(gerenteId: string): Promise<Gerente> {
    return await this.gerenteRepository.findOne({ where: { id: gerenteId }, relations: ['clientes'] });
  }
}
