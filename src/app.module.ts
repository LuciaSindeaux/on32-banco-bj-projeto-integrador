import { Module } from '@nestjs/common';
import { Cliente } from './modulos/usuarios/cliente.module';
import { Gerente } from './modulos/usuarios/gerente.module';
import { GerenteController } from './controllers/gerente.controller';
import { ClienteService } from './servicos/cliente.service';
import { GerenteService } from './servicos/gerente.service';
import { ClienteController } from './controllers/cliente.controller';

@Module({
  imports: [Cliente, Gerente],
  controllers: [GerenteController, ClienteController],
  providers: [ClienteService, GerenteService],
})
export class AppModule {}
