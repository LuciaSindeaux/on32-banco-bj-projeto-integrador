import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';
import { TipoConta } from '../../dominio/enums/tipo-conta-enum';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateContaDto extends PartialType(CreateContaDto) {

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