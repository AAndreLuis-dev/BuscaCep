import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { formatCEP, isValidCEP } from "../../utils";

interface SearchFormProps {
  onSearch: (query: string) => void;
  onAddressSearch: (uf: string, city: string, street: string) => void;
  loading: boolean;
}

const states = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  onAddressSearch,
  loading,
}) => {
  const [searchType, setSearchType] = useState<"cep" | "address">("cep");
  const [cepQuery, setCepQuery] = useState("");
  const [addressQuery, setAddressQuery] = useState({
    uf: "",
    city: "",
    street: "",
  });

  const handleCEPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepQuery.trim()) {
      onSearch(cepQuery.trim());
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressQuery.uf && addressQuery.city && addressQuery.street) {
      onAddressSearch(addressQuery.uf, addressQuery.city, addressQuery.street);
    }
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    if (formatted.length <= 9) {
      setCepQuery(formatted);
    }
  };

  return (
    <div className="bg-horizon-contrast rounded-2xl shadow-xl p-6 mb-8 border border-horizon-contrast-light">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setSearchType("cep")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            searchType === "cep"
              ? "bg-horizon-primary text-horizon-bg shadow-lg shadow-horizon-primary/30"
              : "text-horizon-text-muted hover:text-horizon-text hover:bg-horizon-contrast-light"
          }`}
        >
          Buscar por CEP
        </button>
        <button
          onClick={() => setSearchType("address")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            searchType === "address"
              ? "bg-horizon-primary text-horizon-bg shadow-lg shadow-horizon-primary/30"
              : "text-horizon-text-muted hover:text-horizon-text hover:bg-horizon-contrast-light"
          }`}
        >
          Buscar por Endereço
        </button>
      </div>

      {searchType === "cep" ? (
        <form onSubmit={handleCEPSubmit} className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={cepQuery}
              onChange={handleCEPChange}
              placeholder="Digite o CEP (ex: 01310-100)"
              className="w-full px-4 py-3 bg-horizon-contrast border border-horizon-contrast-light rounded-lg focus:ring-2 focus:ring-horizon-primary focus:border-transparent transition-all text-horizon-primary placeholder-horizon-text-muted"
              maxLength={9}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !isValidCEP(cepQuery)}
            className="px-6 py-3 bg-horizon-primary text-horizon-bg rounded-lg hover:bg-horizon-primary-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all font-medium shadow-lg shadow-horizon-primary/30"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Buscar
          </button>
        </form>
      ) : (
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={addressQuery.uf}
              onChange={(e) =>
                setAddressQuery((prev) => ({ ...prev, uf: e.target.value }))
              }
              className="px-4 py-3 bg-horizon-contrast border border-horizon-contrast-light rounded-lg focus:ring-2 focus:ring-horizon-primary focus:border-transparent transition-all text-horizon-text"
              required
            >
              <option value="">Selecione o Estado</option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={addressQuery.city}
              onChange={(e) =>
                setAddressQuery((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="Cidade"
              className="px-4 py-3 bg-horizon-contrast border border-horizon-contrast-light rounded-lg focus:ring-2 focus:ring-horizon-primary focus:border-transparent transition-all text-horizon-text placeholder-horizon-text-muted"
              required
            />
            <input
              type="text"
              value={addressQuery.street}
              onChange={(e) =>
                setAddressQuery((prev) => ({ ...prev, street: e.target.value }))
              }
              placeholder="Logradouro (mín. 3 caracteres)"
              className="px-4 py-3 bg-horizon-contrast border border-horizon-contrast-light rounded-lg focus:ring-2 focus:ring-horizon-primary focus:border-transparent transition-all text-horizon-text placeholder-horizon-text-muted"
              minLength={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={
              loading ||
              !addressQuery.uf ||
              !addressQuery.city ||
              addressQuery.street.length < 3
            }
            className="w-full px-6 py-3 bg-horizon-primary text-horizon-bg rounded-lg hover:bg-horizon-primary-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all font-medium shadow-lg shadow-horizon-primary/30"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Buscar Endereços
          </button>
        </form>
      )}
    </div>
  );
};
