'use client';

import { useState, useEffect } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  className?: string;
}

export default function SearchInput({
  placeholder = 'Search...',
  onSearch,
  debounceMs = 300,
  className = '',
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm 
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
        transition-all duration-200 shadow-sm hover:shadow-md
        placeholder:text-gray-400 text-gray-700 ${className}`}
    />
  );
}
