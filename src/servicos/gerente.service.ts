import { Injectable } from '@nestjs/common';
import { Gerente } from '../modulos/usuarios/gerente.module';
import { Cliente } from '../modulos/usuarios/cliente.module';
import { TipoConta } from '../enums/tipo-conta-enum';
import { ContaCorrente } from '../modulos/contas/ContaCorrente';
import { ContaPoupanca } from '../modulos/contas/ContaPoupanca';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  listarGerentes(): Gerente[] {
    return this.gerentes;
  }

  adicionarGerente(gerente: Gerente): Gerente {
    this.gerentes.push(gerente);
    return gerente;
  }

  adicionarCliente(gerenteId: string, cliente: Cliente): void {
    const gerente = this.encontrarGerentePorId(gerenteId);
    if (gerente) {
      gerente.clientes.push(cliente);
    }
  }

  abrirConta(gerenteId: string, clienteId: string, tipoConta: TipoConta): void {
    const gerente = this.encontrarGerentePorId(gerenteId);
    if (gerente) {
      const cliente = gerente.clientes.find((c) => c.id === clienteId);
      if (cliente) {
        let novaConta;
        if (tipoConta === TipoConta.CORRENTE) {
          novaConta = new ContaCorrente(Math.random().toString(), 0);
        } else if (tipoConta === TipoConta.POUPANCA) {
          novaConta = new ContaPoupanca(Math.random().toString(), 0);
        }
        if (novaConta) {
          cliente.contas.push(novaConta);
        }
      }
    }
  }

  mudarTipoConta(
    gerente: Gerente,
    clienteId: string,
    contaId: string,
    novoTipo: TipoConta,
    taxaJuros?: number,
  ): void {
    const cliente = gerente.clientes.find((c) => c.id === clienteId);
    if (cliente) {
      const conta = cliente.contas.find((conta) => conta.id === contaId);
      if (conta) {
        if (
          novoTipo === TipoConta.CORRENTE &&
          !(conta instanceof ContaCorrente)
        ) {
          cliente.contas = cliente.contas.filter((c) => c.id !== contaId);
          const novaConta = new ContaCorrente(contaId, 100);
          cliente.contas.push(novaConta);
        } else if (
          novoTipo === TipoConta.POUPANCA &&
          !(conta instanceof ContaPoupanca)
        ) {
          cliente.contas = cliente.contas.filter((c) => c.id !== contaId);
          const novaConta = new ContaPoupanca(contaId, taxaJuros || 0);
          cliente.contas.push(novaConta);
        }
      }
    }
  }

  encontrarGerentePorId(gerenteId: string): Gerente | undefined {
    return this.gerentes.find((g) => g.id === gerenteId);
  }
}
