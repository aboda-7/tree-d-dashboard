import React, { useEffect, useState } from 'react';
import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import Footer from '../../shared/components/footer';
import ArtifactCard from './components/artifact-card';
import { useDashboardData } from '../../hooks/use_dashboard_data';
import SearchBar from './components/search-bar';

const Artifact = () => {
  useEffect(() => {
    document.title = "Artifacts | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();
  const [artifactsData, setArtifactsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtifacts = artifactsData.filter(artifact =>
    artifact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (data?.stored_data?.length > 0) {
      // create accumulators for st1, st2, st3
      const total = {
        st1: { ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0 },
        st2: { ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0 },
        st3: { ar: 0, en: 0, fr: 0, sp: 0, gr: 0, ja: 0, ko: 0 },
      };

      // loop through each handset and sum all artifacts
      data.stored_data.forEach(device => {
        if (!device.artifacts) return;

        ['st1', 'st2', 'st3'].forEach(st => {
          const artifact = device.artifacts[st];
          if (artifact) {
            Object.keys(total[st]).forEach(lang => {
              total[st][lang] += artifact[lang] || 0;
            });
          }
        });
      });

      // now create final array for rendering
      const combinedArtifacts = [
        {
          name: "Ain Ghazal",
          pic: "/assets/Artifacts/ain_ghazal.png",
          color: "#8B7355",
          completionRate: 78,
          languages: [
            { name: "Arabic", value: total.st1.ar, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
            { name: "English", value: total.st1.en, color: "#4A90E2", flag: "/assets/Flags/england.png" },
            { name: "Spanish", value: total.st1.sp, color: "#F5A623", flag: "/assets/Flags/spain.png" },
            { name: "French", value: total.st1.fr, color: "#BD10E0", flag: "/assets/Flags/french.png" },
            { name: "German", value: total.st1.gr, color: "#50E3C2", flag: "/assets/Flags/germany.png" },
            { name: "Korean", value: total.st1.ko, color: "#7B68EE", flag: "/assets/Flags/korea.png" },
            { name: "Japanese", value: total.st1.ja, color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
          ].sort((a, b) => b.value - a.value),
        },
        {
          name: "Atargatis",
          pic: "/assets/Artifacts/atargatis.png",
          color: "#C17F5D",
          completionRate: 65,
          languages: [
            { name: "Arabic", value: total.st2.ar, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
            { name: "English", value: total.st2.en, color: "#4A90E2", flag: "/assets/Flags/england.png" },
            { name: "Spanish", value: total.st2.sp, color: "#F5A623", flag: "/assets/Flags/spain.png" },
            { name: "French", value: total.st2.fr, color: "#BD10E0", flag: "/assets/Flags/french.png" },
            { name: "German", value: total.st2.gr, color: "#50E3C2", flag: "/assets/Flags/germany.png" },
            { name: "Korean", value: total.st2.ko, color: "#7B68EE", flag: "/assets/Flags/korea.png" },
            { name: "Japanese", value: total.st2.ja, color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
          ].sort((a, b) => b.value - a.value),
        },
        {
          name: "Mesha Stele",
          pic: "/assets/Artifacts/mesha_stele.png",
          color: "#A0826D",
          completionRate: 54,
          languages: [
            { name: "Arabic", value: total.st3.ar, color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
            { name: "English", value: total.st3.en, color: "#4A90E2", flag: "/assets/Flags/england.png" },
            { name: "Spanish", value: total.st3.sp, color: "#F5A623", flag: "/assets/Flags/spain.png" },
            { name: "French", value: total.st3.fr, color: "#BD10E0", flag: "/assets/Flags/french.png" },
            { name: "German", value: total.st3.gr, color: "#50E3C2", flag: "/assets/Flags/germany.png" },
            { name: "Korean", value: total.st3.ko, color: "#7B68EE", flag: "/assets/Flags/korea.png" },
            { name: "Japanese", value: total.st3.ja, color: "#FF6B9D", flag: "/assets/Flags/japan.png" },
          ].sort((a, b) => b.value - a.value),
        },
      ];

      setArtifactsData(combinedArtifacts);
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
        <Header title="Artifacts" isConnected={isConnected} />

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {filteredArtifacts.map((artifact) => (
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
