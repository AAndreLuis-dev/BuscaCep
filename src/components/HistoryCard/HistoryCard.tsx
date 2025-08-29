import React from 'react';
import { Calendar } from 'lucide-react';
import type { SearchHistory } from '../../types';
import { formatCEP } from '../../utils';

interface HistoryCardProps {
  item: SearchHistory;
  onClick: () => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item, onClick }) => (
  <div
    className="bg-horizon-contrast border border-horizon-contrast-light rounded-lg p-4 hover:shadow-md hover:border-horizon-primary/50 transition-all cursor-pointer group"
    onClick={onClick}
  >
    <div className="flex items-center gap-2 mb-2">
      <Calendar className="w-4 h-4 text-horizon-text-muted" />
      <span className="text-xs text-horizon-text-muted">
        {new Date(item.timestamp).toLocaleDateString('pt-BR')}
      </span>
    </div>
    <p className="font-medium text-horizon-text group-hover:text-horizon-primary transition-colors">
      {formatCEP(item.address.cep)}
    </p>
    <p className="text-sm text-horizon-text-secondary truncate">
      {item.address.localidade}, {item.address.uf}
    </p>
  </div>
);