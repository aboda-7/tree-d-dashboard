import { useNavigate } from "react-router-dom";
import Layout from "../../shared/components/layout";
import { useDashboardData } from "../../hooks/use_dashboard_data";
import Header from "../../shared/components/header";
import Footer from "../../shared/components/footer";
import { useEffect } from "react";

const Languages = () => {

  useEffect(() => {
    document.title = "Languages | Tree'd Admin Panel";
  }, []);

  const navigate = useNavigate();
  const { data, isConnected, lastUpdate } = useDashboardData();

const totalLanguages = {
    ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0
  };

  data.stored_data.forEach(device => {
    // sum languages
    Object.keys(totalLanguages).forEach(lang => {
      totalLanguages[lang] += device.languages?.[lang] || 0;
    });
  });

  // now use totals to build your chart arrays
  const languages = Object.keys(totalLanguages)
    .map(lang => {
      const langInfo = {
        ar: { name: "Arabic", color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
        en: { name: "English", color: "#4A90E2", flag: "/assets/Flags/england.png" },
        ko: { name: "Korean", color: "#7B68EE", flag: "/assets/Flags/korea.png" },
        ja: { name: "Japanese", color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
        sp: { name: "Spanish", color: "#F5A623", flag: "/assets/Flags/spain.png" },
        gr: { name: "German", color: "#50E3C2", flag: "/assets/Flags/germany.png" },
        fr: { name: "French", color: "#BD10E0", flag: "/assets/Flags/french.png" }
      }[lang];
      return {
        ...langInfo,
        interactions: totalLanguages[lang]
      };
    })
    .sort((a, b) => b.interactions - a.interactions);


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
        <Header
            title={"Languages"}
            isConnected={isConnected}
            battery={data.Battery}    
        />

        {/* Grid of Language Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {languages.map((lang) => (
            <div
              key={lang.id}
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
          ))}
        </div>
        <Footer 
            lastUpdate={lastUpdate}
        />
      </div>
    </Layout>
  );
};

export default Languages;
