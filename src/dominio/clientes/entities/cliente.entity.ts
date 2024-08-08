
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ContaBancaria } from '../../contas/entities/conta.entity';
import { Gerente } from '../../gerentes/entities/gerente.entity';
import { TipoConta } from 'src/dominio/enums/tipo-conta-enum';


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
  gerenteId: string;

  @OneToMany(() => ContaBancaria, (conta) => conta.cliente, { cascade: true })
  contas: ContaBancaria[];
}

