import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { TipoConta } from '../../../dominio/enums/tipo-conta-enum';

export class CreateClienteDto {

  @IsNotEmpty()
  nomeCompleto: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsString()
  gerente: string;

  tipoConta: TipoConta;
}