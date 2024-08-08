import { TipoConta } from '../../enums/tipo-conta-enum';

export class CreateContaDto {
  clienteId: string;
  tipoConta: TipoConta;
  saldoInicial: number;
  limiteChequeEspecial?: number; // Only for ContaCorrente
  taxaJuros?: number; // Only for ContaPoupanca
}
