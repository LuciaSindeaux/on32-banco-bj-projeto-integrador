import { TipoConta } from '../../../domain/enums/tipo-conta-enum';

export class UpdateClienteDto {
  nomeCompleto: string;
  endereco?: string;
  telefone?: string;
  gerenteId?: string;
  tipoConta?: TipoConta;
}
