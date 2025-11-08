import React from 'react';
import { Amphora } from 'lucide-react';
import ArtifactCard from './artifcat_card';

const ArtifactInteractionsSection = ({ artifacts, formatNumberArtifact }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
  }}>
    <h2 style={{
      fontSize: '24px',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '28px'
    }}>
      <Amphora size={24} color="#2D5F7F" style={{ marginRight: '12px', verticalAlign: 'middle' }} />
      Featured Artifact Interactions
    </h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px'
    }}>
      {artifacts.map((artifact) => (
        <ArtifactCard
          key={artifact.name}
          artifact={artifact}
          formatNumberArtifact={formatNumberArtifact}
        />
      ))}
    </div>
  </div>
);

export default ArtifactInteractionsSection;
