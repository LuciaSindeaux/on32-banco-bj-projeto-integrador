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

  async removerCliente(
    id: string,
    clienteId: string,
  ): Promise<Gerente | undefined> {
    return await this.gerenteRepository.removerCliente(id, clienteId);
  }

  async abrirConta(
    clienteId: string,
    tipoConta: TipoConta,
    saldoInicial: number,
  ): Promise<void> {
    const gerente = await this.gerenteRepository.findOne(clienteId);
    const cliente = gerente.clientes.find(
      (cliente) => cliente.id === clienteId,
    );
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    let conta;
    if (tipoConta === TipoConta.CORRENTE) {
      conta = new ContaCorrente();
      conta.limiteChequeEspecial = 1000;
    } else if (tipoConta === TipoConta.POUPANCA) {
      conta = new ContaPoupanca();
      conta.taxaJuros = 0.05;
    }

    conta.saldo = saldoInicial;
    cliente.contas.push(conta);
    await this.gerenteRepository.save(gerente);
  }

  async mudarTipoConta(
    clienteId: string,
    contaId: string,
    novoTipo: TipoConta,
  ): Promise<void> {
    const gerente = await this.gerenteRepository.findOne(clienteId);
    const cliente = gerente.clientes.find(
      (cliente) => cliente.id === clienteId,
    );
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const contaIndex = cliente.contas.findIndex(
      (conta) => conta.id === contaId,
    );
    if (contaIndex === -1) {
      throw new Error('Conta não encontrada');
    }

    let novaConta;
    if (
      novoTipo === TipoConta.CORRENTE &&
      !(cliente.contas[contaIndex] instanceof ContaCorrente)
    ) {
      novaConta = new ContaCorrente();
      novaConta.limiteChequeEspecial = 1000;
    } else if (
      novoTipo === TipoConta.POUPANCA &&
      !(cliente.contas[contaIndex] instanceof ContaPoupanca)
    ) {
      novaConta = new ContaPoupanca();
      novaConta.taxaJuros = 0.05;
    }

    if (novaConta) {
      novaConta.saldo = cliente.contas[contaIndex].saldo;
      cliente.contas[contaIndex] = novaConta;
      await this.gerenteRepository.save(gerente);
    }
  }

  async encontrarGerentePorId(gerenteId: string): Promise<Gerente> {
    return this.gerenteRepository.findOne(gerenteId);
  }
}
