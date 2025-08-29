import React from 'react';
import { MapPin, Globe } from 'lucide-react';

export const Header: React.FC = () => (
  <header className="bg-horizon-bg-secondary shadow-2xl border-b border-horizon-contrast">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-horizon-primary rounded-xl flex items-center justify-center shadow-lg shadow-horizon-primary/20">
            <MapPin className="w-6 h-6 text-horizon-bg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-horizon-text">CEP Finder</h1>
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