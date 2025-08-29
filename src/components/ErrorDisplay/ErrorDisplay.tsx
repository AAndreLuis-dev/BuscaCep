import React from 'react';
import { Globe, Search, AlertCircle } from 'lucide-react';
import { CustomApiError } from '../../types';

interface ErrorDisplayProps {
  error: CustomApiError;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return <Globe className="w-12 h-12 text-red-500" />;
      case 'not_found':
        return <Search className="w-12 h-12 text-horizon-primary" />;
      default:
        return <AlertCircle className="w-12 h-12 text-red-500" />;
    }
  };

  const getErrorStyle = () => {
    switch (error.type) {
      case 'not_found':
        return 'border-horizon-primary/30 bg-horizon-primary/10';
      default:
        return 'border-red-500/30 bg-red-500/10';
    }
  };

  return (
    <div className={`border rounded-2xl p-8 text-center ${getErrorStyle()}`}>
      <div className="flex justify-center mb-4">
        {getErrorIcon()}
      </div>
      <h3 className="text-lg font-semibold text-horizon-text mb-2">
        {error.type === 'not_found' ? 'Nenhum resultado encontrado' : 'Ops! Algo deu errado'}
      </h3>
      <p className="text-horizon-text-secondary mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-horizon-primary text-horizon-bg rounded-lg hover:bg-horizon-primary-hover transition-colors font-medium shadow-lg shadow-horizon-primary/30"
      >
        Tentar novamente
      </button>
    </div>
  );
};