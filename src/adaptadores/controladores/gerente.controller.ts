import { Controller, Get, Post, Patch, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { GerenteService } from '../../dominio/servicos/gerente.service';
import { CreateGerenteDto } from '../dtos/create-gerente.dto';
import { Response } from 'express';
import { Cliente } from '../../dominio/clientes/entities/cliente.entity';
import { TipoConta } from '../../dominio/enums/tipo-conta-enum';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  async criarGerente(
    @Body() gerenteData: CreateGerenteDto,
    @Res() res: Response,
  ) {
    try {
      const novoGerente = await this.gerenteService.createGerente(gerenteData);
      res.status(HttpStatus.CREATED).json(novoGerente);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar gerente',
        error: error.message,
      });
    }
  }

  @Get()
  async obterTodosGerentes(@Res() res: Response) {
    try {
      const gerentes = await this.gerenteService.findAllGerentes();
      res.status(HttpStatus.OK).json(gerentes);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar gerentes',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async encontrarGerentePorId(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const gerente = await this.gerenteService.encontrarGerentePorId(id);
      if (gerente) {
        res.status(HttpStatus.OK).json(gerente);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Gerente não encontrado',
        });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar gerente',
        error: error.message,
      });
    }
  }

  @Patch(':id/adicionar-cliente')
  async adicionarCliente(
    @Param('id') id: string,
    @Body() clienteData: Cliente,
    @Res() res: Response,
  ) {
    try {
      const gerente = await this.gerenteService.adicionarCliente(id, clienteData);
      if (gerente) {
        res.status(HttpStatus.OK).json(gerente);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Gerente não encontrado',
        });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao adicionar cliente',
        error: error.message,
      });
    }
  }

  @Delete(':id/remover-cliente/:clienteId')
  async removerCliente(
    @Param('id') id: string,
    @Param('clienteId') clienteId: string,
    @Res() res: Response,
  ) {
    try {
      const gerente = await this.gerenteService.removerCliente(id, clienteId);
      if (gerente) {
        res.status(HttpStatus.OK).json(gerente);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Gerente ou Cliente não encontrado',
        });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao remover cliente',
        error: error.message,
      });
    }
  }

  @Post(':clienteId/abrir-conta')
  async abrirConta(
    @Param('clienteId') clienteId: string,
    @Body() { tipoConta, saldoInicial }: { tipoConta: TipoConta, saldoInicial: number },
    @Res() res: Response,
  ) {
    try {
      await this.gerenteService.abrirConta(clienteId, tipoConta, saldoInicial);
      res.status(HttpStatus.CREATED).json({ message: 'Conta criada com sucesso' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao abrir conta',
        error: error.message,
      });
    }
  }

  @Patch(':clienteId/mudar-tipo-conta/:contaId')
  async mudarTipoConta(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Param('contaId') contaId: string,
    @Body() { novoTipo }: { novoTipo: TipoConta },
    @Res() res: Response,
  ) {
    try {
      await this.gerenteService.mudarTipoConta(gerenteId, clienteId, contaId, novoTipo);
      res.status(HttpStatus.OK).json({ message: 'Tipo de conta alterado com sucesso' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao mudar tipo de conta',
        error: error.message,
      });
    }
  }
}
