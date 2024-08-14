import { Module } from '@nestjs/common';
import { TransacoesController } from '../../Application/controllers/transacoes.controller';
import { TransacoesService } from '../transacoes/services/transacoes.service';

@Module({
    controllers: [TransacoesController],
    providers: [TransacoesService],
})
export class TransacoesModule {}