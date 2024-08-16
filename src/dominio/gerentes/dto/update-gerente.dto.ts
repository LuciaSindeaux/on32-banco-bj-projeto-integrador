import { Cliente } from "src/dominio/clientes/entities/cliente.entity";

export class UpdateGerenteDto  {
    nomeCompleto: string;
    id: string;
    clientes?: Cliente[];
}