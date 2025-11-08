import React from 'react';

// Skeleton Card Component
export const HandsetCardSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {/* Image Skeleton */}
        <div
          className="skeleton"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "8px",
          }}
        />
        
        {/* Title Skeleton */}
        <div
          className="skeleton"
          style={{
            height: "24px",
            width: "120px",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Battery Label and Percentage */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <div
          className="skeleton"
          style={{
            height: "16px",
            width: "60px",
            borderRadius: "4px",
          }}
        />
        <div
          className="skeleton"
          style={{
            height: "20px",
            width: "45px",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Battery Progress Bar Skeleton */}
      <div
        className="skeleton"
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '4px',
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #E2E8F0 0%,
            #F7FAFC 50%,
            #E2E8F0 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

// Filter Skeleton Component
export const HandsetFilterSkeleton = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      padding: '8px 0'
    }}>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="skeleton"
          style={{
            height: "36px",
            width: "140px",
            borderRadius: "8px",
          }}
        />
      ))}
      
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #E2E8F0 0%,
            #F7FAFC 50%,
            #E2E8F0 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

// Grid Skeleton Component
export const HandsetGridSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: '#F5F7FA',
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <HandsetFilterSkeleton />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <HandsetCardSkeleton key={item} />
        ))}
      </div>
    </div>
  );
};

export default HandsetGridSkeleton;