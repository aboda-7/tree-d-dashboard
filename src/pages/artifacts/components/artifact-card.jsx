import React from 'react';
import { TrendingUp } from 'lucide-react';
import CircularProgress from './circular-progress';
import LanguageBar from './language-bar';

const ArtifactCard = ({ artifact, formatNumber }) => {
  const maxValue = Math.max(...artifact.languages.map((l) => l.value), 1);
  const totalInteractions = artifact.languages.reduce((sum, lang) => sum + lang.value, 0);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '2px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img
            src={artifact.pic}
            alt={artifact.name}
            style={{
              width: '120px',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '12px',
            }}
          />
          <div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#2D3748',
                margin: '0 0 8px 0',
              }}
            >
              {artifact.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color={artifact.color} />
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: artifact.color,
                }}
              >
                {formatNumber(totalInteractions)} Total Interactions this month
              </span>
            </div>
          </div>
        </div>

        <CircularProgress
          percentage={artifact.completionRate}
          color={artifact.color}
          size={110}
        />
      </div>

      {/* Languages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {artifact.languages.map((lang) => (
          <LanguageBar
            key={lang.name}
            lang={lang}
            maxValue={maxValue}
            totalInteractions={totalInteractions}
            formatNumber={formatNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtifactCard;
