import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { TipoConta } from '../../enums/tipo-conta-enum';
import { Transacao } from '../../transacoes/entities/transacao.entity';


@Entity()
export class ContaBancaria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoConta, nullable: false })
  tipo: TipoConta;

  @Column({ type: 'decimal', nullable: false, default: 0 })
  saldo: number;

  @Column({ nullable: true })
  limiteChequeEspecial: number;

  @Column({ nullable: true })
  taxaJuros: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => Transacao, (transacao) => transacao.conta)
  transacoes: Transacao[];
}