import { Cliente } from '../../clientes/entities/cliente.entity'; 

export class CreateGerenteDto {
    nomeCompleto: string;
    id: string;
    clientes: Cliente[];
}
