import { TipoConta } from '../../enums/tipo-conta-enum';

export abstract class ContaBancaria {
  id: string;
  tipoConta: TipoConta;
  saldo: number;

  constructor(id: string, tipoConta: TipoConta) {
    this.id = id;
    this.tipoConta = tipoConta;
    this.saldo = 0;
  }

  abstract depositar(valor: number): void;
  abstract sacar(valor: number): void;
  abstract transferir(valor: number, contaDestino: ContaBancaria): void;
  abstract verificarSaldo(): number;
}

export class ContaCorrente extends ContaBancaria {
  limiteChequeEspecial: number;

  constructor(id: string, limiteChequeEspecial: number) {
    super(id, TipoConta.CORRENTE);
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

export class ContaPoupanca extends ContaBancaria {
  taxaJuros: number;

  constructor(id: string, taxaJuros: number) {
    super(id, TipoConta.POUPANCA);
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
