import { Module } from '@nestjs/common';
import { ClienteModule } from '../dominio/clientes/cliente.module';
import { GerenteModule } from '../dominio/gerentes/gerente.module';
import { GerenteController } from '../adaptadores/controladores/gerente.controller';
import { ClienteService } from '../dominio/servicos/cliente.service';
import { GerenteService } from '../dominio/servicos/gerente.service';
import { ClienteController } from '../adaptadores/controladores/cliente.controller';

@Module({
  imports: [ClienteModule, GerenteModule],
  controllers: [GerenteController, ClienteController],
  providers: [ClienteService, GerenteService],
})
export class AppModule {}
