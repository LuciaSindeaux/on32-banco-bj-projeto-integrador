import { Module } from '@nestjs/common';
import { ClienteController } from '../../adaptadores/controladores/cliente.controller';
import { ClienteService } from '../servicos/cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteRepository } from '../../infraestrutura/repositories/clientes.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    controllers: [ClienteController],
    providers: [ClienteService, ClienteRepository],
    exports: [ClienteService, ClienteRepository],
})
export class ClienteModule {}