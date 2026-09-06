import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { search } from '../data/searchIndex';

export default function SiteSearch({ isMobile = false }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!searchRef.current) return;
      if (!isOpen || searchRef.current.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length >= 2) {
      setResults(search(value));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      navigate(results[0].path);
      setQuery('');
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleResultClick = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div ref={searchRef} className="relative w-full px-4 py-2">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full bg-gray-700 text-white text-sm rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.34-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          </svg>
        </div>
        {isOpen && results.length > 0 && (
          <ul className="absolute left-4 right-4 mt-1 bg-gray-800 rounded-md shadow-lg py-1 z-50 max-h-64 overflow-y-auto">
            {results.map((result) => (
              <li key={result.path}>
                <Link
                  to={result.path}
                  onClick={handleResultClick}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-gray-500 truncate">{result.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="bg-gray-800 text-white text-sm rounded-full px-4 py-2 pl-10 w-48 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:w-64 transition-all duration-200"
        />
        <svg
          className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.34-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      </div>
      {isOpen && results.length > 0 && (
        <ul className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <li key={result.path}>
              <Link
                to={result.path}
                onClick={handleResultClick}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <div className="font-medium">{result.title}</div>
                <div className="text-xs text-gray-500 truncate">{result.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
