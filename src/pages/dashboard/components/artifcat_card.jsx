import React from 'react';

const ArtifactCard = ({ artifact, formatNumberArtifact }) => (
  <div
    style={{
      padding: '24px',
      backgroundColor: '#FAFAFA',
      borderRadius: '16px',
      borderLeft: `6px solid ${artifact.color}`,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: '10px'
      }}>
        {artifact.name}
      </h3>
      <div style={{
        fontSize: '38px',
        fontWeight: '700',
        color: artifact.color,
        marginBottom: '8px'
      }}>
        {formatNumberArtifact(artifact.value)}
      </div>
      <div style={{
        fontSize: '14px',
        color: '#718096'
      }}>
        Total Interactions
      </div>
    </div>

    <img
      src={artifact.pic}
      alt={artifact.name}
      style={{
        width: '100px',
        height: 'auto',
        objectFit: 'contain',
        borderRadius: '12px',
      }}
    />
  </div>
);

export default ArtifactCard;
