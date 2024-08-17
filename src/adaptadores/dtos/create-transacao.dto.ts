import { TipoTransacao } from '../../dominio/enums/tipo-transacao-enum';

export class CreateTransacaoDto {
    id: string;
    tipo: TipoTransacao;
    valor: number;
    data: Date;
}