import React from 'react';
import { Languages } from 'lucide-react';
import LanguageCard from './language_card';

const LanguageInteractionsSection = ({ languages, maxValue, formatNumber }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '28px'
    }}>
      <Languages size={24} color="#2D5F7F" />
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#2D3748',
        margin: 0
      }}>
        Language Interactions
      </h2>
    </div>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    }}>
      {languages.map((lang) => (
        <LanguageCard 
          key={lang.name}
          language={lang}
          maxValue={maxValue}
          formatNumber={formatNumber}
        />
      ))}
    </div>
  </div>
);

export default LanguageInteractionsSection;
