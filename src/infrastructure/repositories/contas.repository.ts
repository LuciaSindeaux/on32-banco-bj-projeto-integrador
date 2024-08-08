import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaBancaria } from 'src/domain/contas/entities/conta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContasRepository {
    constructor(
        @InjectRepository(ContaBancaria)
        private readonly GerenteRepository: Repository<ContaBancaria>,
      ) {}
}