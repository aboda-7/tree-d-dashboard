const HandsetCard = ({ handset }) => {
  // Determine battery color based on level
  const getBatteryColor = (battery) => {
    if (battery <= 25) return '#EF4444'; // Red
    if (battery <= 69) return '#F59E0B'; // Yellow
    return '#10B981'; // Green
  };

  return (
    <div
              key={handset.id}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
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
                <img
                  src='/assets/handsets/handset.png'
                  alt={handset.name}
                  style={{
                    width: "80px",
                    height: "auto",
                  }}
                />
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#2D3748",
                    margin: 0,
                  }}
                >
                  {handset.name}
                </h2>
              </div>

              {/* Battery Progress Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#718096'
                }}>
                  Battery
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: getBatteryColor(handset.battery)
                }}>
                  {handset.battery}%
                </span>
              </div>

              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#E2E8F0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${handset.battery}%`,
                  height: '100%',
                  backgroundColor: getBatteryColor(handset.battery),
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
  );
};

export default HandsetCard;