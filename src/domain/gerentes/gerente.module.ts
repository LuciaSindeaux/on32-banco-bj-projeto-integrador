import { Module } from '@nestjs/common';
import { GerenteController } from '../../Application/controllers/gerente.controller';
import { GerenteService } from './services/gerente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Gerente } from './entities/gerente.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Gerente, Cliente])],
    providers: [GerenteService],
    controllers: [GerenteController],
    exports: [GerenteService],
})
export class GerenteModule {}