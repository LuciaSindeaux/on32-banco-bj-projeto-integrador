import { Inject, Injectable } from '@nestjs/common';
import { Gerente } from '../entities/gerente.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { ContaCorrente } from '../../contas/entities/contaCorrente.entity';
import { ContaPoupanca } from '../../contas/entities/contaPoupanca.entity';
import { TipoConta } from '../../enums/tipo-conta-enum';
import { CreateGerenteDto } from '../../../Application/dtos/gerentes/create-gerente.dto';
import { GerenteRepository } from '../../../infrastructure/repositories/gerentes.repository';
import { ClienteRepository } from 'src/infrastructure/repositories/clientes.repository';
@Injectable()
export class GerenteService {
  constructor(
      @Inject('GerenteRepository')
      private readonly GerenteRepository: GerenteRepository,
  ) {}


  async listarGerentes(): Promise<Gerente[]> {
    return await this.GerenteRepository.find({ relations: ['clientes'] });
  }

  async adicionarGerente(gerenteData: Partial<Gerente>): Promise<Gerente> {
    const gerente = this.GerenteRepository.create(gerenteData);
    return await this.GerenteRepository.save(gerente);
  }

  async adicionarCliente(gerenteId: string, clienteData: Partial<Cliente>): Promise<Cliente> {
    const gerente = await this.GerenteRepository.findOne({
      where: { id: gerenteId },
      relations: []
    });
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const cliente = this.clienteRepository.create(clienteData);
    cliente.gerente = gerente.id;
    return await this.clienteRepository.save(cliente);
  }

  async abrirConta(clienteId: string, tipoConta: TipoConta): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId }, relations: ['contas'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const conta = tipoConta === TipoConta.CORRENTE ? new ContaCorrente() : new ContaPoupanca();
    cliente.contas.push(conta);
    await this.clienteRepository.save(cliente);
  }

  async mudarTipoConta(clienteId: string, contaId: string, novoTipo: TipoConta): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId }, relations: ['contas'] });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const contaIndex = cliente.contas.findIndex(conta => conta.id === contaId);
    if (contaIndex === -1) {
      throw new Error('Conta não encontrada');
    }

    let novaConta;
    if (novoTipo === TipoConta.CORRENTE && !(cliente.contas[contaIndex] instanceof ContaCorrente)) {
      novaConta = new ContaCorrente();
    } else if (novoTipo === TipoConta.POUPANCA && !(cliente.contas[contaIndex] instanceof ContaPoupanca)) {
      novaConta = new ContaPoupanca();
    }

    if (novaConta) {
      cliente.contas[contaIndex] = novaConta;
      await this.clienteRepository.save(cliente);
    }
  }

  async encontrarGerentePorId(gerenteId: string): Promise<Gerente> {
    return await this.GerenteRepository.findOne({ where: { id: gerenteId }, relations: ['clientes'] });
  }

    async create(createGerenteDto: CreateGerenteDto): Promise<Gerente> {
    console.log('Criando um novo gerente:', createGerenteDto);
    const gerente = this.GerenteRepository.create(createGerenteDto);
    const savedGerente = await this.GerenteRepository.save(gerente);
    console.log('Gerente criado com sucesso:', savedGerente);
    return savedGerente;
  }

  async findAll(): Promise<Gerente[]> {
    console.log('Buscando todos os gerentes');
    const gerentes = this.GerenteRepository.findAllGerentes();
    console.log('Gerentes encontrados:', gerentes);
    return gerentes;
  }
}
