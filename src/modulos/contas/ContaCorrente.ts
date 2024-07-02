import { ContaBancaria } from './Conta';
import { TipoConta } from '../../enums/tipo-conta-enum';

export class ContaCorrente extends ContaBancaria {
  private limiteChequeEspecial: number;

  constructor(id: string) {
    super(id, TipoConta.CORRENTE);
    this.limiteChequeEspecial = 100.0;
  }

  get limite(): number {
    return this.limiteChequeEspecial;
  }

  depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  sacar(valor: number): void {
    if (valor > 0 && valor <= this.saldo + this.limiteChequeEspecial) {
      this.saldo -= valor;
    }
  }

  transferir(valor: number, contaDestino: ContaBancaria): void {
    if (valor > 0 && valor <= this.saldo + this.limiteChequeEspecial) {
      this.sacar(valor);
      contaDestino.depositar(valor);
    }
  }

  verificarSaldo(): number {
    return this.saldo;
  }
}
