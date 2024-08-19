import { IsNotEmpty, IsNumber, isNumber, IsString } from 'class-validator';
import { TipoConta } from '../enums/tipo-conta-enum';

export class CreateClienteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nomeCompleto: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  gerenteId: string;
  
  @IsNotEmpty()
  @IsNumber()
  rendaSalarial: number;

  tipoConta: TipoConta;
}

