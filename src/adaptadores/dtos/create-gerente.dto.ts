import { IsNotEmpty, IsString } from 'class-validator';
import { Cliente } from '../../dominio/clientes/entities/cliente.entity'; 

export class CreateGerenteDto {
    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;

    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    clientes?: Cliente[];
}
