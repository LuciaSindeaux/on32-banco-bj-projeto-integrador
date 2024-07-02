import { ContaBancaria } from './conta';
import { TipoConta } from '../../enums/tipo-conta-enum';

export class ContaPoupanca extends ContaBancaria {
  private taxaJuros: number;

  constructor(id: string, taxaJuros: number) {
    super(id, TipoConta.POUPANCA);
    this.taxaJuros = taxaJuros;
  }

  get juros(): number {
    return this.taxaJuros;
  }

  depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  sacar(valor: number): void {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
    }
  }

  transferir(valor: number, contaDestino: ContaBancaria): void {
    if (valor > 0 && valor <= this.saldo) {
      this.sacar(valor);
      contaDestino.depositar(valor);
    }
  }

  verificarSaldo(): number {
    return this.saldo;
  }

  aplicarJuros(): void {
    this.saldo += this.saldo * this.taxaJuros;
  }
}
