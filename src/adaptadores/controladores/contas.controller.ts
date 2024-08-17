import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ContasService } from '../../dominio/servicos/contas.service';
import { CreateContaDto } from '../dtos/create-conta.dto';
import { UpdateContaDto } from '../dtos/update-conta.dto';
import { TransacaoService } from '../../dominio/servicos/transacao.service';

@Controller('contas')
export class ContasController {
  constructor(
    private readonly contasService: ContasService,
    private readonly TransacaoService: TransacaoService,
  ) {}

  @Post()
  create(@Body() createContaDto: CreateContaDto) {
    return this.contasService.create(createContaDto);
  }

  @Get()
  findAll() {
    return this.contasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const conta = await this.contasService.findOne(id);
      return conta;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contasService.update(id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contasService.remove(id);
  }

  @Post(':id/depositar')
  async depositar(@Param('id') contaId: string, @Body('valor') valor: number) {
    try {
      const transacao = await this.TransacaoService.depositar(contaId, valor);
      return {
        message: 'Depósito realizado com sucesso',
        data: transacao,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/sacar')
  async sacar(@Param('id') contaId: string, @Body('valor') valor: number) {
    try {
      const transacao = await this.TransacaoService.sacar(contaId, valor);
      return {
        message: 'Saque realizado com sucesso',
        data: transacao,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/transferir')
  async transferir(
    @Param('id') contaOrigemId: string,
    @Body('contaDestinoId') contaDestinoId: string,
    @Body('valor') valor: number,
  ) {
    try {
      const transacao = await this.TransacaoService.transferir(contaOrigemId, contaDestinoId, valor);
      return {
        message: 'Transferência realizada com sucesso',
        data: transacao,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/extrato')
  async extrato(@Param('id') contaId: string) {
    try {
      const extrato = await this.TransacaoService.getExtrato(contaId);
      return {
        message: 'Extrato obtido com sucesso',
        data: extrato,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
