import { Module } from '@nestjs/common';
import { GerenteController } from '../../adaptadores/controladores/gerente.controller';
import { GerenteService } from '../servicos/gerente.service';

@Module({
    controllers: [GerenteController],
    providers: [GerenteService],
})
export class GerenteModule {}