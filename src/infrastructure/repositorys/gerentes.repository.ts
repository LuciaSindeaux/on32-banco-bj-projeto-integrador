import { EntityRepository, Repository } from 'typeorm';
import { Gerente } from '../../domain/gerentes/entities/gerente.entity';

@EntityRepository(Gerente)
export class GerenteRepository extends Repository<Gerente> {}