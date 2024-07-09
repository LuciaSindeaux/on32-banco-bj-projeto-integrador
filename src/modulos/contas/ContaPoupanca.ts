import { ContaBancaria } from './IConta';
import { TipoConta } from '../../enums/tipo-conta-enum';

export class ContaPoupanca implements ContaBancaria {
  id: string;
  tipoConta: TipoConta;
  saldo: number;
  taxaJuros: number;

  constructor(id: string, taxaJuros: number) {
    this.id = id;
    this.tipoConta = TipoConta.POUPANCA;
    this.saldo = 0;
    this.taxaJuros = taxaJuros;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    if (valor <= this.saldo) {
      this.saldo -= valor;
    } else {
      throw new Error('Saldo insuficiente para saque.');
    }
  }

  transferir(valor: number, contaDestino: ContaBancaria): void {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      contaDestino.depositar(valor);
    } else {
      throw new Error('Saldo insuficiente para transferência.');
    }
  }

  verificarSaldo(): number {
    return this.saldo;
  }
}
