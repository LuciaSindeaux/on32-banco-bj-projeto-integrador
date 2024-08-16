import { ChildEntity, Column } from 'typeorm';
import { ContaBancaria } from './conta.entity';

@ChildEntity()
export class ContaPoupanca extends ContaBancaria {
  @Column()
  taxaJuros: number;

  @Column()
  saldo: number;
}