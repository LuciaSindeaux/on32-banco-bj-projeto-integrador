
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ContaBancaria } from '../../contas/entities/conta.entity';
import { Gerente } from '../../gerentes/entities/gerente.entity'


@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeCompleto: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @ManyToOne(() => Gerente, (gerente) => gerente.clientes)
  @JoinColumn({ name: 'gerente_id' })
  gerenteId: string;

  @OneToMany(() => ContaBancaria, (conta) => conta.cliente, { cascade: true })
  contas: ContaBancaria[];
}

