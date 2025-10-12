import React from 'react';

const LanguageBar = ({ lang, maxValue, totalInteractions, formatNumber }) => {
  const percentage = ((lang.value / totalInteractions) * 100).toFixed(1);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          minWidth: '140px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img
          src={lang.flag}
          alt={`${lang.name} flag`}
          style={{
            width: '28px',
            height: '19px',
            borderRadius: '3px',
            objectFit: 'cover',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
        <span
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#2D3748',
          }}
        >
          {lang.name}
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            flex: 1,
            height: '32px',
            backgroundColor: '#E2E8F0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(lang.value / maxValue) * 100}%`,
              height: '100%',
              backgroundColor: lang.color,
              borderRadius: '8px',
              transition: 'width 0.5s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '12px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {percentage}%
            </span>
          </div>
        </div>

        <span
          style={{
            minWidth: '70px',
            textAlign: 'right',
            fontSize: '18px',
            fontWeight: '700',
            color: lang.color,
          }}
        >
          {formatNumber(lang.value)}
        </span>
      </div>
    </div>
  );
};

export default LanguageBar;
