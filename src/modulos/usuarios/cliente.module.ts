/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPessoa } from '../usuarios/IPessoa';
import { Gerente } from '../usuarios/gerente.module';
import { ContaBancaria } from '../contas/IConta';
import { ContaCorrente } from '../contas/ContaCorrente';
import { ContaPoupanca } from '../contas/ContaPoupanca';
import { TipoConta } from '../../enums/tipo-conta-enum';

export class Cliente implements IPessoa {
  contas: ContaBancaria[] = [];
  gerente: Gerente;

  constructor(
    public nomeCompleto: string,
    public id: string,
    gerente: Gerente,
    public endereco?: string,
    public telefone?: string,
  ) {
    this.gerente = gerente;
  }

  abrirConta(conta: ContaBancaria): void {
    this.contas.push(conta);
  }

  fecharConta(conta: ContaBancaria): void {
    this.contas = this.contas.filter((c) => c !== conta);
  }

  mudarTipoConta(conta: ContaBancaria, novoTipo: TipoConta): void {
    const index = this.contas.indexOf(conta);
    if (index !== -1) {
      if (novoTipo === TipoConta.CORRENTE) {
        this.contas[index] = new ContaCorrente(conta.id, 100);
      } else if (novoTipo === TipoConta.POUPANCA) {
        this.contas[index] = new ContaPoupanca(conta.id, 0.01);
      }
    }
  }
}
