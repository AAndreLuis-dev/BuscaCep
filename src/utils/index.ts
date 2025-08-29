import { Address, CustomApiError } from '../types';

export class CEPService {
  private static readonly BASE_URL = 'https://viacep.com.br/ws';

  static async searchCEP(cep: string): Promise<Address> {
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) {
      throw new CustomApiError('CEP deve conter 8 dígitos', 'invalid_format');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/${cleanCEP}/json/`);
      
      if (!response.ok) {
        throw new CustomApiError('Erro no servidor', 'server_error');
      }

      const data = await response.json();
      
      if (data.erro) {
        throw new CustomApiError('CEP não encontrado', 'not_found');
      }

      return data;
    } catch (error) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      throw new CustomApiError('Erro de conexão', 'network');
    }
  }

  static async searchByAddress(uf: string, city: string, street: string): Promise<Address[]> {
    if (!uf || !city || !street || street.length < 3) {
      throw new CustomApiError('Parâmetros inválidos para busca', 'invalid_format');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/${uf}/${city}/${street}/json/`);
      
      if (!response.ok) {
        throw new CustomApiError('Erro no servidor', 'server_error');
      }

      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new CustomApiError('Nenhum endereço encontrado', 'not_found');
      }

      return data.slice(0, 50);
    } catch (error) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      throw new CustomApiError('Erro de conexão', 'network');
    }
  }
}