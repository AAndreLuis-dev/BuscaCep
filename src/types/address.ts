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

export interface ApiErrorType {
  message: string;
  type: 'network' | 'not_found' | 'invalid_format' | 'server_error';
}