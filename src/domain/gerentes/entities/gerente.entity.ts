import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity()
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeCompleto: string;

  @Column({ nullable: true })
  endereco: string;

  @Column({ nullable: true })
  telefone: string;

  @OneToMany(() => Cliente, (cliente) => cliente.gerenteId)
  clientes: Cliente[];
}
