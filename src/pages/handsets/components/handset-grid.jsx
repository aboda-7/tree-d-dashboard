import React, { useState } from 'react';
import HandsetCard from './handset-card';
import HandsetFilter from './handset-filter';

const HandsetGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handsets = [
    { name: 'Handset 1', battery: 85 },
    { name: 'Handset 2', battery: 72 },
    { name: 'Handset 3', battery: 91 },
    { name: 'Handset 4', battery: 68 },
    { name: 'Handset 5', battery: 95 },
    { name: 'Handset 6', battery: 5 },
    { name: 'Handset 7', battery: 23 },
    { name: 'Handset 8', battery: 88 }
  ];

  const filterHandsets = (handsets, filter) => {
    if (filter === 'All') return handsets;
    
    return handsets.filter(handset => {
      if (filter === 'Good') return handset.battery > 69;
      if (filter === 'Medium') return handset.battery > 25 && handset.battery <= 69;
      if (filter === 'Low') return handset.battery <= 25;
      return true;
    });
  };

  const filteredHandsets = filterHandsets(handsets, activeFilter);

  // Calculate counts for each filter
  const counts = {
    all: handsets.length,
    good: handsets.filter(h => h.battery > 69).length,
    medium: handsets.filter(h => h.battery > 25 && h.battery <= 69).length,
    low: handsets.filter(h => h.battery <= 25).length
  };

  return (
    <div style={{
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      fontFamily: "'Montserrat', sans-serif"
    }}>

      <HandsetFilter 
        onFilterChange={setActiveFilter}
        activeFilter={activeFilter}
        counts={counts}
      />

      {filteredHandsets.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <p style={{
            fontSize: '18px',
            color: '#718096',
            margin: 0
          }}>
            No handsets found with {activeFilter.toLowerCase()} battery
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {filteredHandsets.map((handset) => (
            <HandsetCard key={handset.name} handset={handset} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HandsetGrid;