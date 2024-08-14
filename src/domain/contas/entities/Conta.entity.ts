import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { TipoConta } from '../../enums/tipo-conta-enum';
import { Transacao } from '../../transações/transacao.entity';

@Entity()
export class ContaBancaria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: TipoConta;

  @Column()
  saldo: number;

  @Column({ nullable: true })
  limiteChequeEspecial: number;

  @Column({ nullable: true })
  taxaJuros: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  cliente: Cliente;

  @OneToMany(() => Transacao, (transacao) => transacao.conta)
  transacoes: Transacao[];
}
