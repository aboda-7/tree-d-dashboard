import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../../shared/components/layout';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const CircularProgress = ({ percentage, color, size = 80 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: `${size / 4}px`,
            fontWeight: '700',
            color,
            lineHeight: 1,
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

const CompletionRate = () => {
  const [expandedLang, setExpandedLang] = useState(null);
  const [completionRange, setCompletionRange] = useState([0, 100]);

  const languagesData = useMemo(() => ({
    arabic: {
      name: "Arabic",
      color: "#E85D75",
      flag: "/assets/Flags/arabic7.png",
      artifacts: [
        { name: "Imhotep", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png", completion: 87 },
        { name: "Osoris", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png", completion: 92 },
        { name: "Stella of Queen Tetisheri", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png", completion: 78 },
        { name: "Ain Ghazal", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png", completion: 65 },
        { name: "Roman Theatre", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg", completion: 71 },
        { name: "Statue Of Liberty", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png", completion: 94 },
        { name: "Rosetta Stone", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png", completion: 88 },
        { name: "Van Gough Self-Portrait", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png", completion: 76 },
        { name: "Mona Lisa", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png", completion: 91 },
      ].sort((a, b) => b.completion - a.completion)
    },
    english: {
      name: "English",
      color: "#4A90E2",
      flag: "/assets/Flags/england.png",
      artifacts: [
        { name: "Imhotep", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png", completion: 95 },
        { name: "Osoris", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png", completion: 98 },
        { name: "Stella of Queen Tetisheri", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png", completion: 89 },
        { name: "Ain Ghazal", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png", completion: 82 },
        { name: "Roman Theatre", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg", completion: 86 },
        { name: "Statue Of Liberty", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png", completion: 100 },
        { name: "Rosetta Stone", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png", completion: 93 },
        { name: "Van Gough Self-Portrait", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png", completion: 88 },
        { name: "Mona Lisa", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png", completion: 97 },
      ].sort((a, b) => b.completion - a.completion)
    },
    french: {
      name: "French",
      color: "#BD10E0",
      flag: "/assets/Flags/french.png",
      artifacts: [
        { name: "Imhotep", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png", completion: 72 },
        { name: "Osoris", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png", completion: 85 },
        { name: "Stella of Queen Tetisheri", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png", completion: 68 },
        { name: "Ain Ghazal", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png", completion: 59 },
        { name: "Roman Theatre", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg", completion: 77 },
        { name: "Statue Of Liberty", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png", completion: 91 },
        { name: "Rosetta Stone", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png", completion: 84 },
        { name: "Van Gough Self-Portrait", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png", completion: 79 },
        { name: "Mona Lisa", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png", completion: 96 },
      ].sort((a, b) => b.completion - a.completion)
    },
    chinese: {
      name: "Chinese",
      color: "#7B68EE",
      flag: "/assets/Flags/china.png",
      artifacts: [
        { name: "Imhotep", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png", completion: 63 },
        { name: "Osoris", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png", completion: 71 },
        { name: "Stella of Queen Tetisheri", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png", completion: 55 },
        { name: "Ain Ghazal", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png", completion: 48 },
        { name: "Roman Theatre", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg", completion: 61 },
        { name: "Statue Of Liberty", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png", completion: 75 },
        { name: "Rosetta Stone", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png", completion: 69 },
        { name: "Van Gough Self-Portrait", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png", completion: 58 },
        { name: "Mona Lisa", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png", completion: 73 },
      ].sort((a, b) => b.completion - a.completion)
    },
    dutch: {
      name: "Dutch",
      color: "#FF6B9D",
      flag: "/assets/Flags/netherlands.png",
      artifacts: [
        { name: "Imhotep", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png", completion: 81 },
        { name: "Osoris", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png", completion: 88 },
        { name: "Stella of Queen Tetisheri", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png", completion: 74 },
        { name: "Ain Ghazal", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png", completion: 67 },
        { name: "Roman Theatre", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg", completion: 79 },
        { name: "Statue Of Liberty", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png", completion: 92 },
        { name: "Rosetta Stone", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png", completion: 86 },
        { name: "Van Gough Self-Portrait", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png", completion: 83 },
        { name: "Mona Lisa", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png", completion: 90 },
      ].sort((a, b) => b.completion - a.completion)
    }
  }), []);

  const minDistance = 10;

  const handleRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setCompletionRange([
        Math.min(newValue[0], completionRange[1] - minDistance),
        completionRange[1],
      ]);
    } else {
      setCompletionRange([
        completionRange[0],
        Math.max(newValue[1], completionRange[0] + minDistance),
      ]);
    }
  };


  const toggleLanguage = (langKey) => {
    setExpandedLang(expandedLang === langKey ? null : langKey);
  };

  return (
    <Layout bgColor="#1c2429">
        <div
      style={{
        padding: "40px",
        backgroundColor: "#F5F7FA",
        minHeight: "100vh",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1475px",
          margin: "0 auto",
        }}
      >
            <h1
            style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#1c2429",
                marginBottom: "32px",
            }}
            >
          Language Artifact Completion
        </h1>

        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1c2429", marginBottom: "12px" }}>
            Filter by completion rate ({completionRange[0]}% - {completionRange[1]}%)
          </h3>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={completionRange}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              disableSwap
              min={0}
              max={100}
            />
          </Box>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {Object.entries(languagesData).map(([key, lang]) => (
            <div
              key={key}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                overflow: "hidden",
              }}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleLanguage(key)}
                style={{
                  width: "100%",
                  padding: "24px 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7FAFC"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    style={{
                      width: "60px",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "cover",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  />
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#2D3748",
                      fontFamily: "'Montserrat', sans-serif",
                      margin: 0,
                    }}
                  >
                    {lang.name}
                  </h2>
                </div>
                {expandedLang === key ? (
                  <ChevronUp size={28} color="#2D3748" />
                ) : (
                  <ChevronDown size={28} color="#2D3748" />
                )}
              </button>

              {/* Accordion Content */}
              {expandedLang === key && (
                <div
                  style={{
                    padding: "0 32px 32px 32px",
                    borderTop: "2px solid #E2E8F0",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                      gap: "24px",
                      marginTop: "24px" ,
                    }}
                  >
                    {lang.artifacts
                    .filter(
                      (artifact) =>
                        artifact.completion >= completionRange[0] &&
                        artifact.completion <= completionRange[1]
                    )
                    .map((artifact, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "20px",
                          backgroundColor: "#f6f6f6ff",
                          borderRadius: "12px",
                        }}
                      >
                            <h3
                            style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                color: "#1c2429",
                                marginBottom: "16px",
                            }}
                            >
                          {artifact.name}
                        </h3>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <img
                            src={artifact.pic}
                            alt={artifact.name}
                            style={{
                              width: "auto",
                              height: "100px",
                              objectFit: "contain",
                              borderRadius: "6px",
                            }}
                          />
                          <CircularProgress
                            percentage={artifact.completion}
                            color={artifact.color}
                            size={80}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CompletionRate;