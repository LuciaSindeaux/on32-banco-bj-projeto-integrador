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

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
    cliente.gerenteId = this.id;
  }

  removerCliente(clienteId: string): void {
    const clienteIndex = this.clientes.findIndex(
      (cliente) => cliente.id === clienteId,
    );
    if (clienteIndex !== -1) {
      this.clientes.splice(clienteIndex, 1);
    }
  }
}
