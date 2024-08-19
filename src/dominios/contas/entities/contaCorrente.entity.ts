import { ChildEntity, Column } from 'typeorm';
import { ContaBancaria } from './conta.entity';

@ChildEntity()
export class ContaCorrente extends ContaBancaria {
  @Column()
  limiteChequeEspecial: number;

  @Column()
  saldo: number;

}