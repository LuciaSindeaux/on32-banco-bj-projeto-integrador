import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';
import { TipoConta } from 'src/dominio/enums/tipo-conta-enum';

export class UpdateContaDto extends PartialType(CreateContaDto) {

  clienteId: string;
  tipoConta: TipoConta;
  saldoInicial?: number;
  limiteChequeEspecial?: number; 
  taxaJuros?: number; 
}