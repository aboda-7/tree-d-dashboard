import React from 'react';

const LanguageCard = ({ language, maxValue, formatNumber }) => {
  return (
    <div 
      style={{
        padding: '20px',
        backgroundColor: '#F7FAFC',
        borderRadius: '12px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#2D3748'
          }}>
            {language.name}
          </span>
          <img 
            src={language.flag} 
            alt={`${language.name} flag`} 
            style={{
              width: '24px',
              height: '16px',
              borderRadius: '3px',
              objectFit: 'cover',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} 
          />
        </div>
        <span style={{
          fontSize: '24px',
          fontWeight: '700',
          color: language.color
        }}>
          {formatNumber(language.value)}
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#E2E8F0',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${(language.value / maxValue) * 100}%`,
          height: '100%',
          backgroundColor: language.color,
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );
};

export default LanguageCard;
