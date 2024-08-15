import { EntityRepository, Repository } from 'typeorm';
import { Gerente } from '../../domain/gerentes/entities/gerente.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from 'src/domain/clientes/entities/cliente.entity';

@Injectable()
export class GerenteRepository {
  constructor(
    @InjectRepository(Gerente)
    private readonly GerenteRepository: Repository<Gerente>,
  ) {}

  async findAllGerentes(p0: { relations: string[] }): Promise<Gerente[]> {
    return await this.GerenteRepository.find();
  }

  async save(gerente: Gerente): Promise<Gerente> {
    return await this.GerenteRepository.save(gerente);
  }
  async findOne(id: string): Promise<Gerente> {
    return await this.GerenteRepository.findOne({ where: { id } });
  }
  async adicionarCliente(
    gerenteId: string,
    cliente: Cliente,
  ): Promise<Gerente | null> {
    const gerente = await this.findOne(gerenteId);
    if (gerente) {
      gerente.clientes.push(cliente);
      return await this.save(gerente);
    }
    return null;
  }

  async removerCliente(
    gerenteId: string,
    clienteId: string,
  ): Promise<Gerente | null> {
    const gerente = await this.findOne(gerenteId);
    if (gerente) {
      const clienteIndex = gerente.clientes.findIndex(
        (c) => c.id === clienteId,
      );
      if (clienteIndex !== -1) {
        gerente.clientes.splice(clienteIndex, 1);
        return await this.save(gerente);
      }
    }
    return null;
  }
}
