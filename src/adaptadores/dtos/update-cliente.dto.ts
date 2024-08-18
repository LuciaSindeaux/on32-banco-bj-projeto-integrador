import { TipoConta } from '../../dominio/enums/tipo-conta-enum';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nomeCompleto: string;

  @IsNotEmpty()
  endereco?: string;

  @IsNotEmpty()
  telefone?: string;
  
  @IsString()
  gerenteId?: string;
  
  @IsNotEmpty()
  @IsNumber()
  rendaSalarial?: number;

  tipoConta?: TipoConta;
}
