const shimmerStyle = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite'
};

const SkeletonHeader = () => (
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
);

export default SkeletonHeader