import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../shared/components/layout";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Footer from "../../shared/components/footer";

const LanguageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${id.charAt(0).toUpperCase() + id.slice(1)} | Tree'd Admin Panel`;
  }, [id]);


  const langData = {
    arabic: { name: "Arabic", color: "#E85D75", flag: "/assets/flags/arabic7.png" },
    english: { name: "English", color: "#4A90E2", flag: "/assets/flags/england.png" },
    korean: { name: "Korean", color: "#7B68EE", flag: "/assets/flags/korea.png" },
    japanese: { name: "Japanese", color: "#FF6B9D", flag: "/assets/flags/japan.png" },
    spanish: { name: "Spanish", color: "#F5A623", flag: "/assets/flags/spain.png" },
    german: { name: "German", color: "#50E3C2", flag: "/assets/flags/germany.png" },
    french: { name: "French", color: "#BD10E0", flag: "/assets/flags/french.png" },
  };

  // Mock artifacts data for the selected language
  const artifactsData = [
    { name: "Ain Ghazal", pic: "/assets/Artifacts/ain_ghazal.png", value: 45000, color: "#8B7355" },
    { name: "Atargatis", pic: "/assets/Artifacts/atargatis.png", value: 32000, color: "#C17F5D" },
    { name: "Mesha Stele", pic: "/assets/Artifacts/mesha_stele.png", value: 28000, color: "#A0826D" },
  ];

  const lang = langData[id];

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!lang) {
    return <div style={{ padding: 40 }}>Language not found</div>;
  }

  const totalInteractions = artifactsData.reduce((sum, artifact) => sum + artifact.value, 0);
  const maxValue = Math.max(...artifactsData.map((a) => a.value), 1);

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
        <button
          onClick={() => navigate("/languages")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#2D5F7F",
            marginBottom: "24px",
            fontSize: "16px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
              paddingBottom: "24px",
              borderBottom: "2px solid #E2E8F0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <img
                src={lang.flag}
                alt={lang.name}
                style={{
                  width: "80px",
                  height: "auto",
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#2D3748",
                    margin: "0 0 8px 0",
                  }}
                >
                  {lang.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TrendingUp size={20} color="#2D3748" />
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#2D3748",
                    }}
                  >
                    {formatNumber(totalInteractions)} Total Interactions this month
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Artifacts List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {artifactsData.map((artifact) => {
              const percentage = ((artifact.value / totalInteractions) * 100).toFixed(1);
              
              return (
                <div
                  key={artifact.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "140px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={artifact.pic}
                      alt={artifact.name}
                      style={{
                        width: "27px",
                        height: "auto",
                        borderRadius: "3px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2D3748",
                      }}
                    >
                      {artifact.name}
                    </span>
                  </div>

                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        flex: 1,
                        height: "32px",
                        backgroundColor: "#E2E8F0",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(artifact.value / maxValue) * 100}%`,
                          height: "100%",
                          backgroundColor: artifact.color,
                          borderRadius: "8px",
                          transition: "width 0.5s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          paddingRight: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "white",
                            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          }}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        minWidth: "70px",
                        textAlign: "right",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: artifact.color,
                      }}
                    >
                      {formatNumber(artifact.value)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default LanguageDetail;