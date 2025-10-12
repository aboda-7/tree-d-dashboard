import { useEffect } from "react";
import React, { useState } from 'react';
import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import Footer from '../../shared/components/footer';
import ArtifactCard from './components/artifact-card';
import { useDashboardData } from '../../hooks/use_dashboard_data';

const Artifact = () => {
    
  useEffect(() => {
    document.title = "Artifacts | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();
  const [artifactsData, setArtifactsData] = useState([]);

  useEffect(() => {
    // only run when data actually exists
    if (data?.stored_data?.[0]?.artifacts?.st1) {
      const st1 = data.stored_data[0].artifacts.st1;
      const st2 = data.stored_data[0].artifacts.st2;
      const st3 = data.stored_data[0].artifacts.st3;

      setArtifactsData([
        {
          name: "Ain Ghazal",
          pic: "/assets/Artifacts/ain_ghazal.png",
          color: "#8B7355",
          completionRate: 78,
          languages: [
            { name: "Arabic", value: st1.ar || 0, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
            { name: "English", value: st1.en || 0, color: "#4A90E2", flag: "/assets/Flags/england.png" },
            { name: "Spanish", value: st1.sp || 0, color: "#F5A623", flag: "/assets/Flags/spain.png" },
            { name: "French", value: st1.fr || 0, color: "#BD10E0", flag: "/assets/Flags/french.png" },
            { name: "German", value: st1.gr || 0, color: "#50E3C2", flag: "/assets/Flags/germany.png" },
            { name: "Korean", value: st1.ko || 0, color: "#7B68EE", flag: "/assets/Flags/korea.png" },
            { name: "Japanese", value: st1.ja || 0, color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
          ].sort((a, b) => b.value - a.value),
        },
        {
          name: "Atargatis",
          pic: "/assets/Artifacts/atargatis.png",
          color: "#C17F5D",
          completionRate: 65,
          languages: [
            { name: "Arabic", value: st2.ar || 0, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
            { name: "English", value: st2.en || 0, color: "#4A90E2", flag: "/assets/Flags/england.png" },
            { name: "Spanish", value: st2.sp || 0, color: "#F5A623", flag: "/assets/Flags/spain.png" },
            { name: "French", value: st2.fr || 0, color: "#BD10E0", flag: "/assets/Flags/french.png" },
            { name: "German", value: st2.gr || 0, color: "#50E3C2", flag: "/assets/Flags/germany.png" },
            { name: "Korean", value: st2.ko || 0, color: "#7B68EE", flag: "/assets/Flags/korea.png" },
            { name: "Japanese", value: st2.ja || 0, color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
          ].sort((a, b) => b.value - a.value),
        },
        {
          name: "Mesha Stele",
          pic: "/assets/Artifacts/mesha_stele.png",
          color: "#A0826D",
          completionRate: 54,
          languages: [
            { name: "Arabic", value: st3.ar || 0, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
            { name: "English", value: st3.en || 0, color: "#4A90E2", flag: "/assets/Flags/england.png" },
            { name: "Spanish", value: st3.sp || 0, color: "#F5A623", flag: "/assets/Flags/spain.png" },
            { name: "French", value: st3.fr || 0, color: "#BD10E0", flag: "/assets/Flags/french.png" },
            { name: "German", value: st3.gr || 0, color: "#50E3C2", flag: "/assets/Flags/germany.png" },
            { name: "Korean", value: st3.ko || 0, color: "#7B68EE", flag: "/assets/Flags/korea.png" },
            { name: "Japanese", value: st3.ja || 0, color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
          ].sort((a, b) => b.value - a.value),
        },
      ]);
    }
  }, [data]);


  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return num.toLocaleString();
    return num.toString();
  };

  return (
    <Layout bgColor="#1c2429">
      <div
        style={{
          padding: '40px',
          backgroundColor: '#F5F7FA',
          minHeight: '100vh',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Header title="Artifacts"  isConnected={isConnected} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {artifactsData.map((artifact) => (
            <ArtifactCard
              key={artifact.name}
              artifact={artifact}
              formatNumber={formatNumber}
            />
          ))}
        </div>

        <Footer lastUpdate={lastUpdate} />
      </div>
    </Layout>
  );
};

export default Artifact;