import { useNavigate } from "react-router-dom";
import Layout from "../../shared/components/layout";
import { useDashboardData } from "../../hooks/use_dashboard_data";
import Header from "../../shared/components/header";
import Footer from "../../shared/components/footer";
import { useEffect, useState } from "react";

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

const SkeletonCardLanguage = () => (
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
      {/* Flag skeleton */}
      <div
        style={{
          width: "32px",
          height: "20px",
          borderRadius: "3px",
          backgroundColor: "#E2E8F0",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      {/* Title skeleton */}
      <div
        style={{
          width: "120px",
          height: "20px",
          borderRadius: "4px",
          backgroundColor: "#E2E8F0",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>

    {/* Number skeleton */}
    <div
      style={{
        width: "80px",
        height: "36px",
        borderRadius: "6px",
        backgroundColor: "#E2E8F0",
        marginBottom: "6px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    {/* Label skeleton */}
    <div
      style={{
        width: "140px",
        height: "14px",
        borderRadius: "3px",
        backgroundColor: "#E2E8F0",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  </div>
);

const Languages = () => {
  const navigate = useNavigate();
  const { data, isConnected, lastUpdate } = useDashboardData();
  const [languagesData, setLanguagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Languages | Tree'd Admin Panel";
  }, []);

  useEffect(() => {
    if (!data?.stored_data?.length) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);

    // languages to track
    const totalLanguages = {
      ar: 0,
      en: 0,
      fr: 0,
      zh: 0,
      nl: 0,
    };

    // loop over all devices & artifacts
    data.stored_data.forEach((device) => {
      const artifacts = device.artifacts || {};
      Object.values(artifacts).forEach((artifact) => {
        Object.keys(totalLanguages).forEach((lang) => {
          totalLanguages[lang] += artifact?.[lang] || 0;
        });
      });
    });

    // build display array
    const languagesArray = Object.keys(totalLanguages)
      .map((lang) => {
        const langInfo = {
          ar: { name: "Arabic", color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
          en: { name: "English", color: "#4A90E2", flag: "/assets/Flags/england.png" },
          fr: { name: "French", color: "#BD10E0", flag: "/assets/Flags/french.png" },
          zh: { name: "Chinese", color: "#7B68EE", flag: "/assets/Flags/china.png" },
          nl: { name: "Dutch", color: "#FF6B9D", flag: "/assets/Flags/netherlands.png" },
        }[lang];
        return {
          ...langInfo,
          interactions: totalLanguages[lang],
        };
      })
      .sort((a, b) => b.interactions - a.interactions);

    setLanguagesData(languagesArray);
  }, [data]);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
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
        {isLoading ? 
        (<SkeletonHeader/>) :
        (<Header title="Languages" isConnected={isConnected} battery={data.Battery} />)
        }

        {/* Grid of Language Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginTop: "32px",
          }}
        >
          {isLoading ? (
            <>
              <SkeletonCardLanguage />
              <SkeletonCardLanguage />
              <SkeletonCardLanguage />
              <SkeletonCardLanguage />
              <SkeletonCardLanguage />
            </>
          ) : (
          languagesData.map((lang, index) => (
            <div
              key={index}
              onClick={() => navigate(`/languages/${lang.name.toLowerCase()}`)}
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
                  src={lang.flag}
                  alt={lang.name}
                  style={{
                    width: "32px",
                    height: "20px",
                    borderRadius: "3px",
                    objectFit: "cover",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
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
                  {lang.name}
                </h2>
              </div>

              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: lang.color,
                  marginBottom: "6px",
                }}
              >
                {formatNumber(lang.interactions)}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#718096",
                  margin: 0,
                }}
              >
                Total interactions
              </p>
            </div>
          )))}
        </div>

        <Footer lastUpdate={lastUpdate} />
      </div>
    </Layout>
  );
};

export default Languages;
