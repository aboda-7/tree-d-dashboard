import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Egyptian', 'Ancient', 'Roman', 'Modern', 'Art'];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px',
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '16px 24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
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

      {/* Category Tags */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: 1,
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: selectedCategory === category ? '2px solid #4A90E2' : '2px solid #E2E8F0',
              backgroundColor: selectedCategory === category ? '#4A90E2' : 'white',
              color: selectedCategory === category ? 'white' : '#718096',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: "'Montserrat', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.borderColor = '#4A90E2';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;