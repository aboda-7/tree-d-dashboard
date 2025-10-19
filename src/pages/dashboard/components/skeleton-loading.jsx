import React from 'react';
import { Languages, Amphora } from 'lucide-react';

const SkeletonLoading = () => {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  };

  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      fontFamily: "'Montserrat', sans-serif"
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Header Skeleton */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '24px 32px',
        marginBottom: '32px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          width: '120px',
          height: '32px',
          borderRadius: '8px',
          ...shimmerStyle
        }} />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '24px',
            borderRadius: '6px',
            ...shimmerStyle
          }} />
          <div style={{
            width: '100px',
            height: '24px',
            borderRadius: '6px',
            ...shimmerStyle
          }} />
        </div>
      </div>

      {/* Language Interactions Skeleton */}
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
          <Languages size={24} color="#D1D5DB" />
          <div style={{
            width: '220px',
            height: '28px',
            borderRadius: '8px',
            ...shimmerStyle
          }} />
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div 
              key={i}
              style={{
                padding: '20px',
                backgroundColor: '#F7FAFC',
                borderRadius: '12px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '80px',
                    height: '20px',
                    borderRadius: '6px',
                    ...shimmerStyle
                  }} />
                  <div style={{
                    width: '24px',
                    height: '16px',
                    borderRadius: '3px',
                    ...shimmerStyle
                  }} />
                </div>
                <div style={{
                  width: '60px',
                  height: '28px',
                  borderRadius: '6px',
                  ...shimmerStyle
                }} />
              </div>
              
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#E2E8F0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.random() * 60 + 40}%`,
                  height: '100%',
                  borderRadius: '4px',
                  ...shimmerStyle
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Interactions Skeleton */}
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
          <Amphora size={24} color="#D1D5DB" />
          <div style={{
            width: '280px',
            height: '28px',
            borderRadius: '8px',
            ...shimmerStyle
          }} />
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: '24px',
                backgroundColor: '#FAFAFA',
                borderRadius: '16px',
                borderLeft: '6px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  width: '120px',
                  height: '22px',
                  borderRadius: '6px',
                  marginBottom: '10px',
                  ...shimmerStyle
                }} />
                <div style={{
                  width: '80px',
                  height: '42px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  ...shimmerStyle
                }} />
                <div style={{
                  width: '140px',
                  height: '18px',
                  borderRadius: '6px',
                  ...shimmerStyle
                }} />
              </div>
              
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '12px',
                ...shimmerStyle
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div style={{
        textAlign: 'center',
        paddingTop: '24px'
      }}>
        <div style={{
          width: '200px',
          height: '16px',
          borderRadius: '6px',
          margin: '0 auto',
          ...shimmerStyle
        }} />
      </div>
    </div>
  );
};

export default SkeletonLoading;