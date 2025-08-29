import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-horizon-primary mx-auto mb-4" />
      <p className="text-horizon-text-secondary">Buscando endereços...</p>
    </div>
  </div>
);