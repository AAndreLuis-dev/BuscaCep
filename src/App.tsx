import React, { useState, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
  Header,
  SearchForm,
  AddressCard,
  ErrorDisplay,
  AddressDetailModal,
  Pagination,
  HistoryCard,
  LoadingState,
  EmptyState
} from './components';
import { useLocalStorage, useDebounce } from './hooks';
import { CEPService } from './services/cep.service';
import { type Address, type SearchHistory, CustomApiError } from './types';
import { generateId } from './utils';

function App() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CustomApiError | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistory[]>('cep-search-history', []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 12;
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredAddresses = useMemo(() => {
    if (!debouncedSearchQuery) return addresses;
    
    return addresses.filter(address =>
      address.logradouro?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      address.bairro?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      address.localidade?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      address.cep?.includes(debouncedSearchQuery.replace(/\D/g, ''))
    );
  }, [addresses, debouncedSearchQuery]);

  const paginatedAddresses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAddresses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAddresses, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAddresses.length / itemsPerPage);

  const handleSearch = useCallback(async (cep: string) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const address = await CEPService.searchCEP(cep);
      setAddresses([address]);
      
      const historyItem: SearchHistory = {
        id: generateId(),
        cep,
        timestamp: new Date(),
        address
      };
      
      setSearchHistory(prev => [historyItem, ...prev.slice(0, 19)]);
    } catch (err) {
      setError(err as CustomApiError);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [setSearchHistory]);

  const handleAddressSearch = useCallback(async (uf: string, city: string, street: string) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const addresses = await CEPService.searchByAddress(uf, city, street);
      setAddresses(addresses);
    } catch (err) {
      setError(err as CustomApiError);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  const handleAddressClick = useCallback((address: Address) => {
    setSelectedAddress(address);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedAddress(null);
  }, []);

  return (
    <div className="min-h-screen bg-horizon-bg">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-horizon-text mb-4">
            Encontre qualquer endereço do Brasil
          </h2>
          <p className="text-xl text-horizon-text-secondary max-w-2xl mx-auto">
            Busque por CEP ou endereço completo usando a API ViaCEP com interface moderna e profissional
          </p>
        </div>

        <SearchForm 
          onSearch={handleSearch}
          onAddressSearch={handleAddressSearch}
          loading={loading}
        />

        {addresses.length > 1 && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-horizon-text-secondary">
                  {filteredAddresses.length} endereço{filteredAddresses.length !== 1 ? 's' : ''} encontrado{filteredAddresses.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-horizon-text-muted" />
                  <input
                    type="text"
                    placeholder="Filtrar resultados..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-horizon-bg-secondary border border-horizon-contrast-light rounded-lg focus:ring-2 focus:ring-horizon-primary focus:border-transparent text-horizon-text placeholder-horizon-text-muted"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <LoadingState />}

        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        {!loading && !error && addresses.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedAddresses.map((address, index) => (
                <AddressCard
                  key={`${address.cep}-${index}`}
                  address={address}
                  onClick={() => handleAddressClick(address)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        {!loading && !error && addresses.length === 0 && <EmptyState />}

        {searchHistory.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-horizon-text mb-4">Histórico de Buscas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchHistory.slice(0, 8).map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onClick={() => handleSearch(item.cep)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <AddressDetailModal
        address={selectedAddress}
        isOpen={!!selectedAddress}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;