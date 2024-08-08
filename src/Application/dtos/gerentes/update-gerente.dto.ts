import { Cliente } from "src/domain/clientes/entities/cliente.entity";

export class UpdateGerenteDto  {
    nomeCompleto: string;
    id: string;
    clientes?: Cliente[];
}
