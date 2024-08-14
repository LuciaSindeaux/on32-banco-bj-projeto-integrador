import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ContaBancaria } from '../../contas/entities/Conta.entity';
import { TipoTransacao } from 'src/domain/enums/tipo-transacao-enum';

@Entity()
export class Transacoes {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tipo: TipoTransacao;

  @Column()
  valor: number;

  @Column()
  data: Date;

  @ManyToOne(() => ContaBancaria, (conta) => conta.transacoes)
  conta: ContaBancaria;
}
