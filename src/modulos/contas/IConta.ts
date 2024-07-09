import { TipoConta } from '../../enums/tipo-conta-enum';

export interface ContaBancaria {
  id: string;
  tipoConta: TipoConta;
  saldo: number;

  depositar(valor: number): void;
  sacar(valor: number): void;
  transferir(valor: number, contaDestino: ContaBancaria): void;
  verificarSaldo(): number;
}
