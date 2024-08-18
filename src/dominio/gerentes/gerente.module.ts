import { Module } from '@nestjs/common';
import { GerenteController } from '../../adaptadores/controladores/gerente.controller';
import { GerenteService } from '../servicos/gerente.service';
import { Gerente } from './entities/gerente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaBancaria } from '../contas/entities/conta.entity';
import { GerenteRepository } from '../../infraestrutura/repositories/gerentes.repository';
import { ContasModule } from '../contas/contas.module';


@Module({
    imports: [
      TypeOrmModule.forFeature([ Gerente, ContaBancaria]),
      ContasModule
    ],
    controllers: [GerenteController],
    providers: [GerenteService, GerenteRepository],
    exports: [GerenteService, GerenteRepository],
  })
  export class GerenteModule {}