import React from 'react';
import { MapPin, Building, Phone, Globe, Calendar, X } from 'lucide-react';
import type { Address } from '../../types';
import { formatCEP } from '../../utils';

interface AddressDetailModalProps {
  address: Address | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddressDetailModal: React.FC<AddressDetailModalProps> = ({ address, isOpen, onClose }) => {
  if (!isOpen || !address) return null;

  const details = [
    { label: 'CEP', value: formatCEP(address.cep), icon: MapPin },
    { label: 'Logradouro', value: address.logradouro || 'Não informado', icon: Building },
    { label: 'Complemento', value: address.complemento || 'Não informado', icon: Building },
    { label: 'Bairro', value: address.bairro || 'Não informado', icon: MapPin },
    { label: 'Cidade', value: address.localidade, icon: Building },
    { label: 'Estado', value: address.uf, icon: Globe },
    { label: 'DDD', value: address.ddd || 'Não informado', icon: Phone },
    { label: 'IBGE', value: address.ibge || 'Não informado', icon: Calendar },
    { label: 'GIA', value: address.gia || 'Não informado', icon: Calendar },
    { label: 'SIAFI', value: address.siafi || 'Não informado', icon: Calendar },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-horizon-contrast rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-horizon-contrast-light animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-horizon-text">Detalhes do Endereço</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-horizon-bg-secondary rounded-lg flex items-center justify-center hover:bg-horizon-primary/20 transition-colors group"
            >
              <X className="w-5 h-5 text-horizon-text-muted group-hover:text-horizon-primary" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-horizon-bg-secondary rounded-lg border border-horizon-contrast-light">
                <detail.icon className="w-5 h-5 text-horizon-primary" />
                <div>
                  <p className="text-sm font-medium text-horizon-text-muted">{detail.label}</p>
                  <p className="text-horizon-text">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};