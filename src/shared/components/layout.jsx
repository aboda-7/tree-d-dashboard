import React from 'react';
import Sidebar from './sidebar';

const Layout = ({ children, bgColor }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        bgColor={bgColor} 
        onExpandChange={setIsSidebarExpanded}
      />
      
      {/* Dark overlay when sidebar is expanded */}
      {isSidebarExpanded && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 999,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      
      <main style={{ 
        flex: 1, 
        paddingLeft: '100px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;