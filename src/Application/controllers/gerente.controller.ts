import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { GerenteService } from '../../domain/gerentes/services/gerente.service';
import { CreateGerenteDto } from '../../domain/gerentes/dto/create-gerente.dto';
import { Response } from 'express';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  async adicionarGerente(@Body() gerenteData: CreateGerenteDto, @Res() res: Response) {
    console.log('Recebendo solicitação para criar gerente:', gerenteData);
    const novoGerente = await this.gerenteService.create(gerenteData);
    console.log('Novo gerente criado:', novoGerente);
    res.status(HttpStatus.CREATED).json(novoGerente);
  }

  @Get()
  async obterTodosGerentes(@Res() res: Response) {
    console.log('Recebendo solicitação para retornar todos os gerentes');
    const gerentes = await this.gerenteService.findAll();
    console.log('Gerentes retornados:', gerentes);
    res.status(HttpStatus.OK).json(gerentes);
  }
}
