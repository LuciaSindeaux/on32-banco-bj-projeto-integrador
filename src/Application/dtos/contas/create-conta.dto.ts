import { TipoConta } from 'src/domain/enums/tipo-conta-enum';

export class CreateContaDto {
  clienteId: string;
  tipoConta: TipoConta;
  saldoInicial: number;
  limiteChequeEspecial?: number; 
  taxaJuros?: number; 
}
