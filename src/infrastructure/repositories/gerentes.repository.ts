import { InjectRepository } from '@nestjs/typeorm';
import { Gerente } from '../../domain/gerentes/entities/gerente.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGerenteDto } from 'src/Application/dtos/gerentes/create-gerente.dto';


@Injectable()
export class GerenteRepository {
    findAll() {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Gerente)
        private readonly GerenteRepository: Repository<Gerente>,
    ) {}

    async findAllGerentes(): Promise<Gerente[]> {
        return await this.GerenteRepository.find();
    }

    async save(gerente: Gerente): Promise<Gerente> {
        return await this.GerenteRepository.save(gerente);
    }
}