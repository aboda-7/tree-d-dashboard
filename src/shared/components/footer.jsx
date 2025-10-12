import React from 'react';

const Footer = ({ lastUpdate }) => {
  if (!lastUpdate) return null;
  
  return (
    <div style={{
      marginTop: '32px',
      textAlign: 'center',
      color: '#A0AEC0',
      fontSize: '14px'
    }}>
      Last updated: {lastUpdate.toLocaleTimeString()}
    </div>
  );
};

export default Footer;