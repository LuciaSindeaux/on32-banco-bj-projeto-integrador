import { EntityRepository, Repository } from 'typeorm';
import { Cliente } from '../../dominio/clientes/entities/cliente.entity';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {}