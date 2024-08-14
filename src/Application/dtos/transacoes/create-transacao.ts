import { TipoTransacao } from '../../../domain/enums/tipo-transacao-enum';

export class CreateTransacaoDto {
  id: string;
  valor: number;
  tipo: TipoTransacao;
  data: Date = new Date();
  contaId: string;
}
