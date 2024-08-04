
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ClienteService } from '../../domain/clientes/services/cliente.service';
import { CreateClienteDto } from '../../domain/clientes/dto/create-cliente.dto';
import { Cliente } from '../../domain/clientes/entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async criarCliente(@Body() clienteData: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(clienteData);
  }

  @Get()
  async retornarClientes(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.clienteService.remove(id);
  }
}
