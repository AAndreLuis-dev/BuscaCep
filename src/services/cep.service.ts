import type { Address, ApiErrorType } from '../types';

export class ApiError extends Error {
  public readonly type: ApiErrorType['type'];

  constructor(message: string, type: ApiErrorType['type']) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
  }
}

export class CEPService {
  private static readonly BASE_URL = 'https://viacep.com.br/ws';

  static async searchCEP(cep: string): Promise<Address> {
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) {
      throw new ApiError('CEP deve conter 8 dígitos', 'invalid_format');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/${cleanCEP}/json/`);
      
      if (!response.ok) {
        throw new ApiError('Erro no servidor', 'server_error');
      }

      const data = await response.json();
      
      if (data.erro) {
        throw new ApiError('CEP não encontrado', 'not_found');
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Erro de conexão. Verifique sua internet.', 'network');
    }
  }

  static async searchByAddress(uf: string, city: string, street: string): Promise<Address[]> {
    if (!uf || !city || !street || street.length < 3) {
      throw new ApiError('UF, Cidade e Logradouro (mín. 3 caracteres) são obrigatórios.', 'invalid_format');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/${uf}/${encodeURIComponent(city)}/${encodeURIComponent(street)}/json/`);
      
      if (!response.ok) {
        throw new ApiError('Erro no servidor', 'server_error');
      }

      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new ApiError('Nenhum endereço encontrado para os dados informados.', 'not_found');
      }

      return data.slice(0, 50); // Limite de 50 resultados
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Erro de conexão. Verifique sua internet.', 'network');
    }
  }
}

