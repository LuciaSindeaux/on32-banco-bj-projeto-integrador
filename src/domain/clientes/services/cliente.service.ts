import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ContaBancaria } from '../../contas/entities/conta.entity';
import { TipoConta } from '../../enums/tipo-conta-enum';
import { ContaCorrente } from '../../contas/entities/contaCorrente.entity';
import { ContaPoupanca } from '../../contas/entities/contaPoupanca.entity';
import { CreateClienteDto } from '../../../application/dtos/clientes/create-cliente.dto';
import { UpdateClienteDto } from '../../../application/dtos/clientes/update-cliente.dto';
import { ClienteRepository } from '../../../infrastructure/repositories/clientes.repository';

@Injectable()
export class ClienteService {
    constructor(
        @Inject('ClienteRepository')
        private readonly clienteRepository: ClienteRepository,
    ) {}

    async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
        const cliente = new Cliente();
        cliente.nomeCompleto = createClienteDto.nomeCompleto;
        cliente.endereco = createClienteDto.endereco;
        cliente.telefone = createClienteDto.telefone;
        cliente.gerenteId = createClienteDto.gerente;
        cliente.contas = [];

        return await this.clienteRepository.save(cliente);
    }

    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.findAllClients();
    }

    async findOne(id: string): Promise<Cliente> {
        return await this.clienteRepository.findClientById(id);
    }

    async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
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