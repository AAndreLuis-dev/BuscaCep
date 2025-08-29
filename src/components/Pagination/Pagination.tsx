import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-horizon-contrast-light rounded-lg hover:bg-horizon-contrast hover:border-horizon-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-horizon-text-secondary" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
          disabled={typeof page !== 'number'}
          className={`px-3 py-2 border rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-horizon-primary text-horizon-bg border-horizon-primary shadow-lg shadow-horizon-primary/30'
              : typeof page === 'number'
              ? 'border-horizon-contrast-light hover:bg-horizon-contrast hover:border-horizon-primary text-horizon-text-secondary'
              : 'cursor-default border-horizon-contrast-light text-horizon-text-muted'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-horizon-contrast-light rounded-lg hover:bg-horizon-contrast hover:border-horizon-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-horizon-text-secondary" />
      </button>
    </div>
  );
};