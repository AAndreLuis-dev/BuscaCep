import React from 'react';
import hrzonIcon from '../../assets/hrzonIcon.png'
import { Globe } from 'lucide-react';

export const Header: React.FC = () => (
  <header className="bg-horizon-bg-secondary shadow-2xl border-b border-horizon-contrast">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <a href="https://www.hrzon.com.br/"><img src={hrzonIcon} alt="Horizon Icon" className="w-12 h-12" /></a>
          <div>
            <h1 className="text-xl font-bold text-horizon-text">Busca Cep</h1>
            <p className="text-xs text-horizon-text-muted">Consulta Profissional de Endereços</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-horizon-text-muted">
            <Globe className="w-4 h-4" />
            <span>ViaCEP API</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);