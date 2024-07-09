import { Cliente } from './cliente.module';
import { ContaBancaria } from '../contas/IConta';
import { IPessoa } from './IPessoa';
import { ContaCorrente } from '../contas/contacorrente';
import { ContaPoupanca } from '../contas/contapoupanca';
import { TipoConta } from '../../enums/tipo-conta-enum';

export class Gerente implements IPessoa {
  clientes: Cliente[] = [];

  constructor(
    nomeCompleto: string,
    id: string,
    endereco?: string,
    telefone?: string,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.id = id;
    this.endereco = endereco;
    this.telefone = telefone;
  }
  nomeCompleto: string;
  id: string;
  endereco?: string;
  telefone?: string;

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente): void {
    this.clientes = this.clientes.filter((c) => c !== cliente);
  }

  abrirConta(cliente: Cliente, tipoConta: TipoConta): void {
    let novaConta: ContaBancaria;

    if (tipoConta === TipoConta.CORRENTE) {
      novaConta = new ContaCorrente('novoNumero', 100);
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
