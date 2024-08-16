import { Repository } from 'typeorm';
import { Cliente } from '../../dominio/clientes/entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteRepository {
    constructor(
      @InjectRepository(Cliente)
      private readonly clienteRepository: Repository<Cliente>,
    ) {}

    async save(cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(cliente);
    }

    async getClientById(id: string): Promise<Cliente> {
        return await this.clienteRepository.findOne({ where: { id } });
    }

    async findClientById(id: string): Promise<Cliente> {
        return await this.clienteRepository.findOne({ where: { id } });
    }

    async deleteClient(id: string): Promise<void> {
        await this.clienteRepository.delete(id);
    }

    async findAllClients(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }
}