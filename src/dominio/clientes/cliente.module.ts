import { Module } from '@nestjs/common';
import { ClienteController } from '../../adaptadores/controladores/cliente.controller';
import { ClienteService } from '../servicos/cliente.service';

@Module({
    controllers: [ClienteController],
    providers: [ClienteService],
})
export class ClienteModule {}