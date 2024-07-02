import { Pessoa } from '../usuarios/Pessoa';
import { Gerente } from '../usuarios/gerente.module';
import { ContaBancaria } from '../contas/Conta';
import { ContaCorrente } from '../contas/ContaCorrente';
import { ContaPoupanca } from '../contas/ContaPoupanca';
import { TipoConta } from 'src/enums/tipo-conta-enum';

export class Cliente extends Pessoa {
  contas: ContaBancaria[] = [];
  gerente: Gerente;

  constructor(
    nomeCompleto: string,
    id: string,
    gerente: Gerente,
    endereco?: string,
    telefone?: string,
  ) {
    super(nomeCompleto, id, endereco, telefone);
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
        this.contas[index] = new ContaCorrente(conta.id);
      } else if (novoTipo === TipoConta.POUPANCA) {
        this.contas[index] = new ContaPoupanca(conta.id, 0.01);
      }
    }
  }
}
