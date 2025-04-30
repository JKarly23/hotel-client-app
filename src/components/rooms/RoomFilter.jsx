import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { filterRooms } from '../../helpers/filterRooms';

const STORAGE_KEY = 'search_query';

const RoomFilter = ({ allRooms, setRooms }) => {
  const [inputValue, setInputValue] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, debouncedValue);
    const filtered = filterRooms(debouncedValue, allRooms);
    setRooms(filtered);
  }, [debouncedValue, allRooms, setRooms]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2 w-full max-w-md ml-auto relative">
      <input
        type="search"
        value={inputValue}
        placeholder="Buscar por estado..."
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
};

export default RoomFilter;
