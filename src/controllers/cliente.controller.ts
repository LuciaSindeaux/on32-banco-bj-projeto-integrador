import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClienteService } from '../servicos/cliente.service';
import { Cliente } from '../modulos/usuarios/cliente.module';
import { v4 as uuidv4 } from 'uuid';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  criarCliente(@Body() clienteData: any): Cliente {
    const { nome, endereco, telefone, gerente } = clienteData;
    const id = uuidv4();
    const cliente = new Cliente(nome, id, gerente, endereco, telefone);
    this.clienteService.adicionarCliente(cliente);
    return cliente;
  }

  @Get()
  retornarClientes(): Cliente[] {
    return this.clienteService.listarClientes();
  }
}
