import { TipoConta } from '../../enums/tipo-conta-enum';

export class UpdateClienteDto {
  id: string;
  nomeCompleto: string;
  endereco?: string;
  telefone?: string;
  gerenteId?: string;
  tipoConta?: TipoConta;
}
