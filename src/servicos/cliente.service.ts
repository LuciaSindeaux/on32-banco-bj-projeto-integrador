import { Injectable } from '@nestjs/common';
import { Cliente } from '../modulos/usuarios/cliente.module';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }
}
