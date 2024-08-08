import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { GerenteService } from '../../dominio/servicos/gerente.service';
import { Gerente } from '../../dominio/users/gerente.module';
import { Cliente } from '../../dominio/users/cliente.module';
import { TipoConta } from '../../dominio/enums/tipo-conta-enum';
import { Response } from 'express';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  // Adiciona um novo gerente
  @Post()
  adicionarGerente(@Body() gerente: Gerente, @Res() res: Response): void {
    const novoGerente = this.gerenteService.adicionarGerente(gerente);
    res.status(HttpStatus.CREATED).json(novoGerente);
  }

  // Adiciona um novo cliente a um gerente
  @Post(':gerenteId/clientes')
  adicionarCliente(
    @Param('gerenteId') gerenteId: string,
    @Body() cliente: Cliente,
    @Res() res: Response,
  ): void {
    const gerente = this.gerenteService.encontrarGerentePorId(gerenteId);
    if (gerente) {
      this.gerenteService.adicionarCliente(gerenteId, cliente);
      res.status(HttpStatus.CREATED).send('Cliente adicionado com sucesso.');
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Gerente não encontrado.');
    }
  }

  // Abre uma nova conta para um cliente
  @Post(':gerenteId/clientes/:clienteId/contas')
  abrirConta(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Body('tipoConta') tipoConta: TipoConta,
    @Res() res: Response,
  ): void {
    const gerente = this.gerenteService.encontrarGerentePorId(gerenteId);
    if (gerente) {
      this.gerenteService.abrirConta(gerenteId, clienteId, tipoConta);
      res.status(HttpStatus.CREATED).send('Conta aberta com sucesso.');
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Gerente não encontrado.');
    }
  }

  // Muda o tipo de uma conta de um cliente
  @Post(':gerenteId/clientes/:clienteId/contas/:contaId/mudarTipo')
  mudarTipoConta(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Param('contaId') contaId: string,
    @Body('novoTipo') novoTipo: TipoConta,
    @Res() res: Response,
  ): void {
    const gerente = this.gerenteService.encontrarGerentePorId(gerenteId);
    if (gerente) {
      this.gerenteService.mudarTipoConta(gerente, clienteId, contaId, novoTipo);
      res.status(HttpStatus.OK).send('Tipo de conta alterado com sucesso.');
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Gerente não encontrado.');
    }
  }

  // Obtém todos os gerentes
  @Get()
  obterTodosGerentes(): Gerente[] {
    return this.gerenteService.listarGerentes();
  }
}
