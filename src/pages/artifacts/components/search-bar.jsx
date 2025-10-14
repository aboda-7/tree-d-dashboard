import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '16px 24px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Search size={24} color="#718096" />
      <input
        type="text"
        placeholder="Search artifacts by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '16px',
          fontFamily: "'Montserrat', sans-serif",
          color: '#2D3748',
          backgroundColor: 'transparent',
        }}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E2E8F0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={20} color="#718096" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;