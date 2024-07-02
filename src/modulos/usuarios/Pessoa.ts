export abstract class Pessoa {
  nomeCompleto: string;
  id: string;
  endereco: string = '';
  telefone: string = ' ';

  constructor(
    nomeCompleto: string,
    id: string,
    endereco?: string,
    telefone?: string,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.id = id;
    this.endereco = endereco ?? '';
    this.telefone = telefone ?? '';
  }
}
