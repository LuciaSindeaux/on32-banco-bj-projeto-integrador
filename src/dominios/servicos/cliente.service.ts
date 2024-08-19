import { Injectable } from '@nestjs/common';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';
import { ClienteRepository } from '../../infraestrutura/repositorios/clientes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaBancaria } from '../contas/entities/conta.entity';
import { Repository } from 'typeorm';
import { TipoConta } from '../enums/tipo-conta-enum';

@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    @InjectRepository(ContaBancaria)
    private readonly contaRepository: Repository<ContaBancaria>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new Cliente();
    cliente.nomeCompleto = createClienteDto.nomeCompleto;
    cliente.endereco = createClienteDto.endereco;
    cliente.telefone = createClienteDto.telefone;
    cliente.rendaSalarial = createClienteDto.rendaSalarial;
    cliente.gerenteId = createClienteDto.gerenteId;

    const novoCliente = await this.clienteRepository.save(cliente);

    const conta = this.contaRepository.create({
      tipo: createClienteDto.tipoConta,
      saldo: 0,
      cliente: novoCliente,
      ...(createClienteDto.tipoConta === TipoConta.CORRENTE && { limiteChequeEspecial: 100 }),
    });

    const novaConta = await this.contaRepository.save(conta);

    novoCliente.contas = [novaConta];
    await this.clienteRepository.save(novoCliente);

    return novoCliente;
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.findAllClients();
  }

  async findOne(id: string): Promise<Cliente> {
    return await this.clienteRepository.findClientById(id);
  }

  async update(
    id: string,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const existingCliente = await this.clienteRepository.findClientById(id);
    if (!existingCliente) {
      throw new Error('Cliente não encontrado!');
    }

    Object.assign(existingCliente, updateClienteDto);
    return await this.clienteRepository.save(existingCliente);
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.deleteClient(id);
  }
}
