import { Cliente } from './cliente.module';
import { ContaBancaria } from '../contas/Conta';
import { Pessoa } from './Pessoa';
import { ContaCorrente } from '../contas/contacorrente';
import { ContaPoupanca } from '../contas/contapoupanca';
import { TipoConta } from 'src/enums/tipo-conta-enum';

export class Gerente extends Pessoa {
  clientes: Cliente[] = [];

  constructor(
    nomeCompleto: string,
    id: string,
    endereco?: string,
    telefone?: string,
  ) {
    super(nomeCompleto, id, endereco, telefone);
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente): void {
    this.clientes = this.clientes.filter((c) => c !== cliente);
  }

  abrirConta(cliente: Cliente, tipoConta: TipoConta): void {
    let novaConta: ContaBancaria;

    if (tipoConta === TipoConta.CORRENTE) {
      novaConta = new ContaCorrente('novoNumero');
    } else if (tipoConta === TipoConta.POUPANCA) {
      novaConta = new ContaPoupanca('novoNumero', 0.01);
    } else {
      throw new Error('Tipo de conta inválido.');
    }

    cliente.abrirConta(novaConta);
  }

  fecharConta(cliente: Cliente, conta: ContaBancaria): void {
    cliente.fecharConta(conta);
  }

  mudarTipoConta(
    cliente: Cliente,
    conta: ContaBancaria,
    novoTipo: TipoConta,
  ): void {
    cliente.mudarTipoConta(conta, novoTipo);
  }
}
