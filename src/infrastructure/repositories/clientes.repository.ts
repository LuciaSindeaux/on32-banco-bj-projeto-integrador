import { Repository } from 'typeorm';
import { Cliente } from '../../domain/clientes/entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteRepository   {
 
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    async save(cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(cliente);
    }

    async getClienteById(id: string): Promise<Cliente> {
        return await this.clienteRepository.findOne({where: {id}});
    }
}
