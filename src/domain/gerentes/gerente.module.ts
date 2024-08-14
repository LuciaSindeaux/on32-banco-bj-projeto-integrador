import { Module } from '@nestjs/common';
import { GerenteController } from '../../Application/controllers/gerente.controller';
import { GerenteService } from './services/gerente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Gerente } from './entities/gerente.entity';
import { GerenteRepository } from 'src/infrastructure/repositories/gerentes.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Gerente, Cliente])],
    providers: [GerenteService, GerenteRepository],
    controllers: [GerenteController],
    exports: [GerenteService, GerenteRepository],
})
export class GerenteModule {}