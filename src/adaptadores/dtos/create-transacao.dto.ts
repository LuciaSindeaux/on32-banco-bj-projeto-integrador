import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { TipoTransacao } from '../../dominio/enums/tipo-transacao-enum';

export class CreateTransacaoDto {
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    tipo: TipoTransacao;

    @IsNotEmpty()
    @IsNumber()
    valor: number;
    
    @IsDate()
    data: Date;
}