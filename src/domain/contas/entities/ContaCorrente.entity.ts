import { ChildEntity, Column } from 'typeorm';
import { ContaBancaria } from './Conta.entity';

@ChildEntity()
export class ContaCorrente extends ContaBancaria {
  @Column()
  limiteChequeEspecial: number;

  @Column()
  saldo: number;

}
