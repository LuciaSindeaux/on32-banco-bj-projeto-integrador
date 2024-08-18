import { IsNotEmpty, IsString } from 'class-validator';
import { TipoConta } from '../../dominio/enums/tipo-conta-enum';

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

  tipoConta: TipoConta;
}

