import { Module } from '@nestjs/common';
import { ClienteController } from '../../Application/controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteRepository } from '../../infrastructure/repositories/clientes.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    controllers: [ClienteController],
    providers: [ClienteService, ClienteRepository],
    exports: [ClienteService, ClienteRepository],
})
export class ClienteModule {}