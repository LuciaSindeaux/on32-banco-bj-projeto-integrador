import { Injectable } from '@nestjs/common';
import { Gerente } from '../gerentes/entities/gerente.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ContaCorrente } from '../contas/entities/ContaCorrente.entity';
import { ContaPoupanca } from '../contas/entities/contaPoupanca.entity';
import { TipoConta } from '../enums/tipo-conta-enum';
import { CreateGerenteDto } from '../gerentes/dto/create-gerente.dto';
import { GerenteRepository} from '../../infraestrutura/repositorios/gerentes.repository';
import { ContasRepository } from '../../infraestrutura/repositorios/contas.repository';


@Injectable()
export class GerenteService {
 
  constructor(
    private readonly gerenteRepository: GerenteRepository,
    private readonly contaRepository: ContasRepository,
  ) {}

  async findAllGerentes(): Promise<void> {
    this.gerenteRepository.findAll({ relations: ['clientes'] });
  }

  async createGerente(CreateGerenteDto: CreateGerenteDto): Promise<Gerente> {
    const gerente = new Gerente();
    gerente.nomeCompleto = CreateGerenteDto.nomeCompleto;
    gerente.id = CreateGerenteDto.id;
    gerente.clientes = [];

    return await this.gerenteRepository.save(gerente);
  }

  async adicionarCliente(
    id: string,
    cliente: Cliente,
  ): Promise<Gerente | undefined> {
    const gerente = await this.gerenteRepository.findOne(id);
    if (gerente) {
      gerente.clientes.push(cliente);
      await this.gerenteRepository.save(gerente);
      return gerente;
    }
    return undefined;
  }

  async removerCliente(
    id: string,
    clienteId: string,
  ): Promise<Gerente | undefined> {
    const gerente = await this.gerenteRepository.findOne(id);
    if (gerente) {
      gerente.clientes = gerente.clientes.filter(
        (cliente) => cliente.id !== clienteId,
      );
      await this.gerenteRepository.save(gerente);
      return gerente;
    }
    return undefined;
  }

  async abrirConta(
    clienteId: string,
    tipoConta: TipoConta,
    saldo: number,
  ): Promise<void> {
    const gerente = this.gerenteRepository.findOne(clienteId);
    if (!gerente) {
      throw new Error('Cliente não encontrado');
    }

    const cliente = (await gerente).clientes.find(
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

    conta.saldo = saldo;
    cliente.contas.push(conta);
  }

  async mudarTipoConta(
    gerenteId: string,
    clienteId: string,
    contaId: string,
    novoTipo: TipoConta,
  ): Promise<void> {
    const gerente = await this.gerenteRepository.findOne(gerenteId);

    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const cliente = gerente.clientes.find(
      (cliente) => cliente.id === clienteId,
    );

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const conta = cliente.contas.find((conta) => conta.id === contaId);

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    conta.tipo = novoTipo;
    if (novoTipo === TipoConta.CORRENTE) {
      conta.limiteChequeEspecial = 100;
    } else {
      conta.limiteChequeEspecial = undefined;
    }

    await this.contaRepository.save(conta);
  }

  async encontrarGerentePorId(gerenteId: string): Promise<Gerente> {
    return this.gerenteRepository.findOne(gerenteId);
  }
}
