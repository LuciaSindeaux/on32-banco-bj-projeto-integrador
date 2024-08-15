import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance, ChildEntity } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipoConta' } })
export abstract class ContaBancaria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  saldo: number;

  @ManyToOne(() => Cliente, cliente => cliente.contas)
  cliente: Cliente;

  abstract depositar(valor: number): void;
  abstract sacar(valor: number): void;
  abstract transferir(valor: number, contaDestino: ContaBancaria): void;
  abstract verificarSaldo(): number;
}
