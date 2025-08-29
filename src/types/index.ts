export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface SearchHistory {
  id: string;
  cep: string;
  timestamp: Date;
  address: Address;
}

export interface ApiError {
  message: string;
  type: 'network' | 'not_found' | 'invalid_format' | 'server_error';
}

export class CustomApiError extends Error {
  public type: ApiError['type'];

  constructor(message: string, type: ApiError['type']) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
  }
}