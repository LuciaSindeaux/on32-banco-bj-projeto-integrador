import { Controller, Get, Post, Patch, Delete, Body, Param, Res, HttpStatus } from "@nestjs/common";
import { Transacoes } from '../../domain/transacoes/entities/transacoes.entity';
import { TransacoesService } from "src/domain/transacoes/services/transacoes.service";
import { CreateTransacaoDto } from "../dtos/transacoes/create-transacao";
import { ContaBancaria } from "src/domain/contas/entities/conta.entity";
import { Response } from 'express';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Get()
  async findAll(): Promise<Transacoes[]> {
    return await this.transacoesService.findAllTransacoes();
  }

  @Post()
  async registrarTransacao(@Body() createTransacaoDto: CreateTransacaoDto, @Res() res: Response) {
    try {
      const novaTransacao = await this.transacoesService.registrarTransacao(createTransacaoDto);
      res.status(HttpStatus.CREATED).json(novaTransacao);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar transação',
        error: error.message,
      });
    }
  }

  @Delete(':id') 
  async deleteTransacao(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.transacoesService.deleteTransacao(id);
      res.status(HttpStatus.OK).json({ message: 'Transação deletada com sucesso' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar transação',
        error: error.message,
      });
    }
  }
}
