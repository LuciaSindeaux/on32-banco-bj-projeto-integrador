import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ContaBancaria } from '../../contas/entities/conta.entity';
import { TipoTransacao } from '../../enums/tipo-transacao-enum';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'enum', enum: TipoTransacao, enumName: 'transacao_tipo_enum', nullable: false })
  tipo: string

  @Column({ type: 'timestamp' })
  data: Date;

  @ManyToOne(() => ContaBancaria, (conta) => conta.transacoes)
  conta: ContaBancaria;

  @ManyToOne(() => ContaBancaria, { nullable: true })
  contaDestino?: ContaBancaria;
}
