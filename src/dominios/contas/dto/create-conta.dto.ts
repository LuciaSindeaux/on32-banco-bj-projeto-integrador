import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateContaDto {
  @IsString()
  @Expose({ name: 'cliente_id' })
  clienteId: string;
  
  @IsNotEmpty()
  tipoConta: string;

  @IsNotEmpty()
  @IsNumber()
  saldo: number;

  @IsOptional()
  @IsNumber()
  limiteChequeEspecial?: number;

  @IsOptional()
  @IsNumber()
  taxaJuros?: number;

}
