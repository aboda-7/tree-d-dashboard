import React, { useEffect, useState } from 'react';
import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import LanguageInteractionsSection from './components/language_interactions_section';
import ArtifactInteractionsSection from './components/artifact_interactions_section';
import Footer from '../../shared/components/footer';
import { useDashboardData } from '../../hooks/use_dashboard_data';
import { formatNumber, formatNumberArtifact } from '../../utils/formatters';

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();
  const [isLoading, setIsLoading] = useState(true);

  // mark loading false when data arrives
  useEffect(() => {
    if (data && data.stored_data && data.stored_data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Layout bgColor="#1c2429">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            backgroundColor: '#F5F7FA',
            color: '#333',
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          <img 
            src="/assets/loading.gif" 
            alt="loading..." 
            style={{ width: 100, marginBottom: 20 }} 
          />
          <h2>Loading Dashboard...</h2>
        </div>
      </Layout>
    );
  }

  // sum all devices' data together
  const totalLanguages = {
    ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0
  };

  const totalArtifacts = {
    st1: { ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0 },
    st2: { ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0 },
    st3: { ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0 }
  };

  data.stored_data.forEach(device => {
    // sum languages
    Object.keys(totalLanguages).forEach(lang => {
      totalLanguages[lang] += device.languages?.[lang] || 0;
    });

    // sum artifacts
    Object.keys(totalArtifacts).forEach(st => {
      Object.keys(totalArtifacts[st]).forEach(lang => {
        totalArtifacts[st][lang] += device.artifacts?.[st]?.[lang] || 0;
      });
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
        value: totalLanguages[lang]
      };
    })
    .sort((a, b) => b.value - a.value);

  const st1 = Object.values(totalArtifacts.st1).reduce((a, b) => a + b, 0);
  const st2 = Object.values(totalArtifacts.st2).reduce((a, b) => a + b, 0);
  const st3 = Object.values(totalArtifacts.st3).reduce((a, b) => a + b, 0);

  const artifacts = [
    { name: "Ain Ghazal", value: st1, color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png" },
    { name: "Atargatis", value: st2, color: "#C17F5D", pic: "/assets/Artifacts/atargatis.png" },
    { name: "Mesha Stele", value: st3, color: "#A0826D", pic: "/assets/Artifacts/mesha_stele.png" }
  ];

  const maxValue = Math.max(...languages.map(l => l.value), 1);

  return (
    <Layout bgColor="#1c2429">
      <div style={{
        padding: '40px',
        backgroundColor: '#F5F7FA',
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif"
      }}>
        <Header 
          title={"Home"}
          battery={data.Battery} 
          isConnected={isConnected} 
        />
        
        <LanguageInteractionsSection 
          languages={languages}
          maxValue={maxValue}
          formatNumber={formatNumber}
        />

        <ArtifactInteractionsSection
          artifacts={artifacts}
          formatNumberArtifact={formatNumberArtifact}
        />
        
        <Footer lastUpdate={lastUpdate} />
      </div>
    </Layout>
  );
};

export default Dashboard;
