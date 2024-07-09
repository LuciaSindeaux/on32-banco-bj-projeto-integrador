import { TipoConta } from '../../enums/tipo-conta-enum';
import { ContaBancaria } from './IConta';

export class ContaCorrente implements ContaBancaria {
  id: string;
  tipoConta: TipoConta;
  saldo: number;
  limiteChequeEspecial: number;

  constructor(id: string, limiteChequeEspecial: number) {
    this.id = id;
    this.tipoConta = TipoConta.CORRENTE;
    this.saldo = 0;
    this.limiteChequeEspecial = limiteChequeEspecial;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    if (valor <= this.saldo + this.limiteChequeEspecial) {
      this.saldo -= valor;
    } else {
      throw new Error('Saldo insuficiente para saque.');
    }
  }

  transferir(valor: number, contaDestino: ContaBancaria): void {
    if (valor <= this.saldo + this.limiteChequeEspecial) {
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
