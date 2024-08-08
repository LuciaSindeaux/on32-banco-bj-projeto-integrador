import { TipoConta } from '../../enums/tipo-conta-enum';

export class CreateClienteDto {
    id: string;
    nomeCompleto: string;
    endereco: string;
    telefone: string;
    gerenteId: string;
    tipoConta: TipoConta;
  }
