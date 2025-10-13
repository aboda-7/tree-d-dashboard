import React, { useState, useEffect } from 'react';
import HandsetCard from './handset-card';
import HandsetFilter from './handset-filter';
import { useDashboardData } from '../../../hooks/use_dashboard_data';

const HandsetGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data, isConnected, lastUpdate } = useDashboardData();
  const [handsets, setHandsets] = useState([]);

  useEffect(() => {
    // whenever backend data changes, update handsets
    if (data && data.stored_data) {
      const formatted = data.stored_data.map((device, index) => ({
        name: device.id || `Handset ${index + 1}`,

        battery: 90,
      }));
      setHandsets(formatted);
    }
  }, [data]);

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

  const counts = {
    all: handsets.length,
    good: handsets.filter(h => h.battery > 69).length,
    medium: handsets.filter(h => h.battery > 25 && h.battery <= 69).length,
    low: handsets.filter(h => h.battery <= 25).length
  };

  if (!isConnected) {
    return (
      <div
        style={{
          backgroundColor: '#F5F7FA',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Montserrat', sans-serif",
          color: '#718096'
        }}
      >
        <p>⚠️ Waiting for connection to backend...</p>
      </div>
    );
  }

  if (handsets.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#F5F7FA',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Montserrat', sans-serif",
          color: '#718096'
        }}
      >
        <p>No handsets found</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#F5F7FA',
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <HandsetFilter
        onFilterChange={setActiveFilter}
        activeFilter={activeFilter}
        counts={counts}
      />

      {!isConnected && (
        <div style={{ textAlign: 'center', color: 'red', marginBottom: '20px' }}>
          ⚠️ Lost connection to backend
        </div>
      )}

      {filteredHandsets.length === 0 ? (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        >
          <p style={{ fontSize: '18px', color: '#718096', margin: 0 }}>
            No handsets found with {activeFilter.toLowerCase()} battery
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}
        >
          {filteredHandsets.map(handset => (
            <HandsetCard key={handset.name} handset={handset} />
          ))}
        </div>
      )}

      <div
        style={{
          textAlign: 'center',
          color: '#555',
          marginTop: '30px',
          fontSize: '14px'
        }}
      >
        Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : '—'}
      </div>
    </div>
  );
};

export default HandsetGrid;
