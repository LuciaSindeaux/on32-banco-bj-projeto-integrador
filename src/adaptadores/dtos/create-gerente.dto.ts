import { Cliente } from '../../dominio/clientes/entities/cliente.entity'; 

export class CreateGerenteDto {
    nomeCompleto: string;
    id: string;
    clientes: Cliente[];
}
