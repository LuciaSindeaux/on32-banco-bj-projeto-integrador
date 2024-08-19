import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoConta } from '../enums/tipo-conta-enum';
import { Expose } from 'class-transformer';

export class CreateContaDto {
  @IsString()
  @Expose({ name: 'cliente_id' })
  clienteId: string;
  
  @IsNotEmpty()
  tipoConta: TipoConta;

  @IsNotEmpty()
  @IsNumber()
  saldoInicial: number;

  @IsOptional()
  @IsNumber()
  limiteChequeEspecial?: number;

  @IsOptional()
  @IsNumber()
  taxaJuros?: number;

}
