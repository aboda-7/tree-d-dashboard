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

  const languages = data?.stored_data?.[0]?.languages
  ? [
      { name: "Arabic", value: data.stored_data[0].languages.ar || 0, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
      { name: "English", value: data.stored_data[0].languages.en || 0,  color: "#4A90E2", flag: "/assets/Flags/england.png" },
      { name: "Korean", value: data.stored_data[0].languages.ko || 0,  color: "#7B68EE", flag: "/assets/Flags/korea.png" },
      { name: "Japanese", value: data.stored_data[0].languages.ja || 0,  color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
      { name: "Spanish", value: data.stored_data[0].languages.sp || 0,  color: "#F5A623", flag: "/assets/Flags/spain.png" },
      { name: "German", value: data.stored_data[0].languages.gr || 0,  color: "#50E3C2", flag: "/assets/Flags/germany.png" },
      { name: "French", value: data.stored_data[0].languages.fr || 0,  color: "#BD10E0", flag: "/assets/Flags/french.png" }
    ].sort((a, b) => b.value - a.value)
  : [];

  const st1 = (
    data.stored_data[0].artifacts.st1.ar +
    data.stored_data[0].artifacts.st1.en +
    data.stored_data[0].artifacts.st1.fr +
    data.stored_data[0].artifacts.st1.sp +
    data.stored_data[0].artifacts.st1.gr +
    data.stored_data[0].artifacts.st1.ja +
    data.stored_data[0].artifacts.st1.ko
  );
  const st2 = (
    data.stored_data[0].artifacts.st2.ar +
    data.stored_data[0].artifacts.st2.en +
    data.stored_data[0].artifacts.st2.fr +
    data.stored_data[0].artifacts.st2.sp +
    data.stored_data[0].artifacts.st2.gr +
    data.stored_data[0].artifacts.st2.ja +
    data.stored_data[0].artifacts.st2.ko
  );
  const st3 = (
    data.stored_data[0].artifacts.st3.ar +
    data.stored_data[0].artifacts.st3.en +
    data.stored_data[0].artifacts.st3.fr +
    data.stored_data[0].artifacts.st3.sp +
    data.stored_data[0].artifacts.st3.gr +
    data.stored_data[0].artifacts.st3.ja +
    data.stored_data[0].artifacts.st3.ko
  );

  const artifacts = data?.stored_data?.[0]?.artifacts
  ? [
    { name: "Ain Ghazal", value: st1, color: "#8B7355", pic: "/assets/artifacts/ain_ghazal.png" },
    { name: "Atargatis", value: st2, color: "#C17F5D", pic: "/assets/artifacts/atargatis.png" },
    { name: "Mesha Stele", value: st3, color: "#A0826D", pic: "/assets/artifacts/mesha_stele.png" }
  ]
  : [];

  const maxValue = Math.max(...languages.map(l => l.value), 1);

  console.log("Dashboard data:", data);
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
