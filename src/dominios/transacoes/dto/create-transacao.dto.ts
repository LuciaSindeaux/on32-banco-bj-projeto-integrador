import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransacaoDto {
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    tipo: string;

    @IsNotEmpty()
    @IsNumber()
    valor: number;
    
    @IsDate()
    data: Date;
}