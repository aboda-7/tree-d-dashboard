import React from 'react';
import { Search } from 'lucide-react';

const ArtifactSkeletonLoading = () => {
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

      {/* Search Bar Skeleton */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '16px 24px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Search size={24} color="#D1D5DB" />
        <div style={{
          flex: 1,
          height: '20px',
          borderRadius: '6px',
          ...shimmerStyle
        }} />
      </div>

      {/* Artifact Cards Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {[1, 2, 3].map((cardIndex) => (
          <div
            key={cardIndex}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Card Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              paddingBottom: '24px',
              borderBottom: '2px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Image skeleton */}
                <div style={{
                  width: '100px',
                  height: '125px',
                  borderRadius: '12px',
                  ...shimmerStyle
                }} />
                
                {/* Title and info skeleton */}
                <div>
                  <div style={{
                    width: '220px',
                    height: '28px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    ...shimmerStyle
                  }} />
                  <div style={{
                    width: '280px',
                    height: '20px',
                    borderRadius: '6px',
                    ...shimmerStyle
                  }} />
                </div>
              </div>

              {/* Circular progress skeleton */}
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                ...shimmerStyle
              }} />
            </div>

            {/* Language Bars Skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[1, 2, 3, 4, 5].map((langIndex) => (
                <div
                  key={langIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  {/* Language name skeleton */}
                  <div style={{
                    minWidth: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '19px',
                      borderRadius: '3px',
                      ...shimmerStyle
                    }} />
                    <div style={{
                      width: '80px',
                      height: '16px',
                      borderRadius: '6px',
                      ...shimmerStyle
                    }} />
                  </div>

                  {/* Progress bar skeleton */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      flex: 1,
                      height: '32px',
                      backgroundColor: '#E2E8F0',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.random() * 60 + 40}%`,
                        height: '100%',
                        borderRadius: '8px',
                        ...shimmerStyle
                      }} />
                    </div>

                    {/* Value skeleton */}
                    <div style={{
                      minWidth: '70px',
                      height: '18px',
                      borderRadius: '6px',
                      ...shimmerStyle
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default ArtifactSkeletonLoading;