import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClienteService } from '../servicos/cliente.service';
import { Cliente } from '../modulos/usuarios/cliente.module';
import { v4 as uuidv4 } from 'uuid';
import { Gerente } from '../modulos/usuarios/gerente.module';
import { TipoConta } from '../enums/tipo-conta-enum';
import { ContaCorrente } from '../modulos/contas/ContaCorrente';
import { ContaPoupanca } from '../modulos/contas/ContaPoupanca';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  criarCliente(@Body() clienteData: any): Cliente {
    const { nomeCompleto, endereco, telefone, gerente, tipoConta } =
      clienteData;
    const id = uuidv4();
    const gerenteObj = new Gerente(gerente, uuidv4(), '', '');
    const cliente = new Cliente(
      nomeCompleto,
      id,
      gerenteObj,
      endereco,
      telefone,
    );

    let conta;
    if (tipoConta === TipoConta.CORRENTE) {
      conta = new ContaCorrente(id, 100);
    } else if (tipoConta === TipoConta.POUPANCA) {
      conta = new ContaPoupanca(id, 0);
    }

    cliente.abrirConta(conta);
    this.clienteService.adicionarCliente(cliente);
    return cliente;
  }

  @Get()
  retornarClientes(): Cliente[] {
    return this.clienteService.listarClientes();
  }
}
