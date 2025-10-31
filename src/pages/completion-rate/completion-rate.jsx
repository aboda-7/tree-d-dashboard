import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
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
  const [completionData, setCompletionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping backend artifact codes to display names
  const ARTIFACT_DISPLAY_NAMES = {
    "st15": "Imhotep",
    "st16": "Osiris",
    "st17": "Tetisheri Stelle",
    "st18": "Ain Ghazal",
    "st19": "Roman Theatre",
    "st21": "Statue Of Liberty",
    "st22": "Rosetta Stone",
    "st23": "Van Gough Self-Portrait",
    "st24": "Mona Lisa",
  };

  // Mapping backend language codes to display names
  const LANGUAGE_DISPLAY_NAMES = {
    "ar": "Arabic",
    "en": "English",
    "fr": "French",
    "nl": "Dutch",
    "zh": "Chinese",
  };

  const languageConfig = {
    Arabic: { color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
    English: { color: "#4A90E2", flag: "/assets/Flags/england.png" },
    French: { color: "#BD10E0", flag: "/assets/Flags/french.png" },
    Dutch: { color: "#FF6B9D", flag: "/assets/Flags/netherlands.png" },
    Chinese: { color: "#7B68EE", flag: "/assets/Flags/china.png" },
  };

  const artifactConfig = {
    "Imhotep": { color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png" },
    "Osiris": { color: "#B8926A", pic: "/assets/Artifacts/Osoris.png" },
    "Tetisheri Stelle": { color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png" },
    "Ain Ghazal": { color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png" },
    "Roman Theatre": { color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg" },
    "Statue Of Liberty": { color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png" },
    "Rosetta Stone": { color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png" },
    "Van Gough Self-Portrait": { color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png" },
    "Mona Lisa": { color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png" },
  };

  useEffect(() => {
    fetchCompletionRates();
  }, []);

  const fetchCompletionRates = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get Firebase auth token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:8000/analytics/completion-rates', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCompletionData(data.completion_rates || []);
    } catch (err) {
      console.error('Error fetching completion rates:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const languagesData = useMemo(() => {
    // Define all artifacts that should always appear
    const allArtifacts = [
      "Imhotep",
      "Osiris", 
      "Tetisheri Stelle",
      "Ain Ghazal",
      "Roman Theatre",
      "Statue Of Liberty",
      "Rosetta Stone",
      "Van Gough Self-Portrait",
      "Mona Lisa"
    ];

    // Initialize grouped structure with all languages
    const grouped = {};
    Object.keys(languageConfig).forEach(langName => {
      grouped[langName] = {
        name: langName,
        color: languageConfig[langName].color,
        flag: languageConfig[langName].flag,
        artifacts: []
      };

      // Add all artifacts with 0% completion as default
      allArtifacts.forEach(artifactName => {
        grouped[langName].artifacts.push({
          name: artifactName,
          color: artifactConfig[artifactName]?.color || "#B8926A",
          pic: artifactConfig[artifactName]?.pic || "/assets/Artifacts/default.png",
          completion: 0,
          totalScans: 0,
          completedListens: 0
        });
      });
    });

    // Update with actual completion data if available
    completionData.forEach(item => {
      const langCode = item.language;
      const artifactCode = item.artifact;
      const langName = LANGUAGE_DISPLAY_NAMES[langCode];
      const artifactName = ARTIFACT_DISPLAY_NAMES[artifactCode];

      if (!langName || !artifactName || !grouped[langName]) return;

      // Find and update the artifact in the grouped data
      const artifactIndex = grouped[langName].artifacts.findIndex(
        a => a.name === artifactName
      );

      if (artifactIndex !== -1) {
        grouped[langName].artifacts[artifactIndex] = {
          ...grouped[langName].artifacts[artifactIndex],
          completion: Math.round(item.completion_rate),
          totalScans: item.total_scans,
          completedListens: item.completed_listens
        };
      }
    });

    // Sort artifacts by completion rate within each language
    Object.values(grouped).forEach(lang => {
      lang.artifacts.sort((a, b) => b.completion - a.completion);
    });

    return grouped;
  }, [completionData]);

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

  if (loading) {
    return (
      <Layout bgColor="#1c2429">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#F5F7FA'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Loader2 size={48} color="#4A90E2" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '16px', color: '#2D3748', fontSize: '18px' }}>Loading completion rates...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout bgColor="#1c2429">
        <div style={{
          padding: "40px",
          backgroundColor: "#F5F7FA",
          minHeight: "100vh",
        }}>
          <div style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "32px",
            backgroundColor: "#FEE",
            borderRadius: "12px",
            border: "2px solid #F88"
          }}>
            <h2 style={{ color: "#C33", marginBottom: "16px" }}>Error Loading Data</h2>
            <p style={{ color: "#333" }}>{error}</p>
            <button
              onClick={fetchCompletionRates}
              style={{
                marginTop: "16px",
                padding: "12px 24px",
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#1c2429",
                margin: 0,
              }}
            >
              Language Artifact Completion
            </h1>
            <button
              onClick={fetchCompletionRates}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              Refresh Data
            </button>
          </div>

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
            {Object.entries(languagesData).map(([key, lang]) => {
              const filteredArtifacts = lang.artifacts.filter(
                (artifact) =>
                  artifact.completion >= completionRange[0] &&
                  artifact.completion <= completionRange[1]
              );

              if (filteredArtifacts.length === 0) return null;

              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                    overflow: "hidden",
                  }}
                >
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
                      <div style={{ textAlign: 'left' }}>
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
                        <p style={{ fontSize: "14px", color: "#718096", margin: "4px 0 0 0" }}>
                          {filteredArtifacts.length} artifact{filteredArtifacts.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    {expandedLang === key ? (
                      <ChevronUp size={28} color="#2D3748" />
                    ) : (
                      <ChevronDown size={28} color="#2D3748" />
                    )}
                  </button>

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
                          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                          gap: "24px",
                          marginTop: "24px",
                        }}
                      >
                        {filteredArtifacts.map((artifact, idx) => (
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
                                fontSize: "18px",
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
                            <div style={{ marginTop: '12px', fontSize: '12px', color: '#718096' }}>
                              <p style={{ margin: '4px 0' }}>
                                {artifact.completedListens} / {artifact.totalScans} completed
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompletionRate;