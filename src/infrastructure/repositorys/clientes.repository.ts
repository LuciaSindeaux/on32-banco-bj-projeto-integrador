import { Repository } from 'typeorm';
import { Cliente } from '../../domain/clientes/entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteRepository implements ClienteRepository  {
    delete(id: string) {
      throw new Error('Method not implemented.');
    }
    findOne(arg0: { where: { id: string; }; }): Cliente | PromiseLike<Cliente> {
      throw new Error('Method not implemented.');
    }
    find(): Cliente[] | PromiseLike<Cliente[]> {
      throw new Error('Method not implemented.');
    }
    save(cliente: Cliente): Cliente | PromiseLike<Cliente> {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}
}
