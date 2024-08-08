import { ChildEntity, Column } from 'typeorm';
import { ContaBancaria } from './Conta.entity';

@ChildEntity()
export class ContaCorrente extends ContaBancaria {
  @Column()
  limiteChequeEspecial: number;
  saldo: number;

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
