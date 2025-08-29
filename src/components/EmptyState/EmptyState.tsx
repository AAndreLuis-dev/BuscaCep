import React from 'react';
import { MapPin } from 'lucide-react';

export const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <MapPin className="w-16 h-16 text-horizon-text-muted mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-horizon-text mb-2">
      Nenhuma busca realizada
    </h3>
    <p className="text-horizon-text-secondary">
      Use o formulário acima para buscar endereços por CEP ou localização
    </p>
  </div>
);