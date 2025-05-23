import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  onDownload: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onDownload }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
            placeholder="Search for Customer"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
      
      <button
        onClick={onDownload}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
      >
        <Download size={18} className="mr-2" />
        Download
      </button>
    </div>
  );
};

export default SearchBar;