import React from 'react';
import { MapPin, Building, Phone, Eye } from 'lucide-react';
import type { Address } from '../../types';
import { formatCEP } from '../../utils';

interface AddressCardProps {
  address: Address;
  onClick: () => void;
  isCompact?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AddressCard: React.FC<AddressCardProps> = ({ address, onClick, isCompact = false }) => (
  <div 
    className="bg-horizon-contrast border border-horizon-contrast-light rounded-xl p-6 hover:shadow-xl hover:shadow-horizon-primary/10 transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-horizon-primary/20 rounded-lg flex items-center justify-center group-hover:bg-horizon-primary/30 transition-colors">
          <MapPin className="w-5 h-5 text-horizon-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-horizon-text">{formatCEP(address.cep)}</h3>
          <p className="text-sm text-horizon-text-muted">{address.localidade}, {address.uf}</p>
        </div>
      </div>
      <Eye className="w-5 h-5 text-horizon-text-muted group-hover:text-horizon-primary transition-colors" />
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Building className="w-4 h-4 text-horizon-text-muted" />
        <span className="text-sm text-horizon-text-secondary">{address.logradouro || 'Não informado'}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-horizon-text-muted" />
        <span className="text-sm text-horizon-text-secondary">{address.bairro || 'Não informado'}</span>
      </div>
      {address.ddd && (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-horizon-text-muted" />
          <span className="text-sm text-horizon-text-secondary">DDD: {address.ddd}</span>
        </div>
      )}
    </div>
  </div>
);