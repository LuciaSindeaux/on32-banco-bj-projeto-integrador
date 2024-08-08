import { EntityRepository, Repository } from 'typeorm';
import { Gerente } from '../../dominio/gerentes/entities/gerente.entity';

@EntityRepository(Gerente)
export class GerenteRepository extends Repository<Gerente> {}