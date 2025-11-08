import React from 'react';
import { Battery, Wifi, WifiOff } from 'lucide-react';

const Header = ({ title, battery, isConnected }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px'
  }}>
    <div>
      <h1 style={{
        fontSize: '36px',
        fontWeight: '700',
        color: '#2D3748',
        margin: '0 0 8px 0'
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#718096',
        margin: 0
      }}>
        Tree'd Admin Panel
      </p>
    </div>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        backgroundColor: isConnected ? '#C6F6D5' : '#FED7D7',
        borderRadius: '12px'
      }}>
        {isConnected ? <Wifi size={20} color="#38A169" /> : <WifiOff size={20} color="#E53E3E" />}
        <span style={{ fontWeight: '600', color: isConnected ? '#38A169' : '#E53E3E' }}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  </div>
);

export default Header;