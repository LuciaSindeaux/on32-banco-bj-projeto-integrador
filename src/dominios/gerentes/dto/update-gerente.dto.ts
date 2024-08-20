import { IsNotEmpty, IsString } from "class-validator";
import { Cliente } from "../../clientes/entities/cliente.entity";

export class UpdateGerenteDto  {
    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    clientes?: Cliente[];
}