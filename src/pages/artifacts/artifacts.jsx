import React, { useEffect, useState } from 'react';
import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import Footer from '../../shared/components/footer';
import ArtifactCard from './components/artifact-card';
import { useDashboardData } from '../../hooks/use_dashboard_data';
import SearchBar from './components/search-bar';
import ArtifactSkeletonLoading from './components/artifact-skeleton-loading';

const Artifact = () => {
  
  useEffect(() => {
    document.title = "Artifacts | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();
  const [artifactsData, setArtifactsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data?.stored_data?.length > 0) {
      const total = {
        st15: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st16: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st17: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st18: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st19: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st21: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st22: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st23: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
        st24: { ar: 0, en: 0, fr: 0, zh: 0, nl: 0 },
      };

      data.stored_data.forEach(device => {
        const artifacts = device.artifacts || {};
        Object.keys(total).forEach(st => {
          Object.keys(total[st]).forEach(lang => {
            total[st][lang] += artifacts?.[st]?.[lang] || 0;
          });
        });
      });

      const languageMap = {
        ar: { name: "Arabic", color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
        en: { name: "English", color: "#4A90E2", flag: "/assets/Flags/england.png" },
        fr: { name: "French", color: "#BD10E0", flag: "/assets/Flags/french.png" },
        zh: { name: "Chinese", color: "#7B68EE", flag: "/assets/Flags/china.png" },
        nl: { name: "Dutch", color: "#FF6B9D", flag: "/assets/Flags/netherlands.png" },
      };

      // define artifact metadata + categories
      const artifactsMeta = {
        st15: { name: "Imhotep", category: "Egyptian", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png", completionRate: 65 },
        st16: { name: "Osoris", category: "Egyptian", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png", completionRate: 70 },
        st17: { name: "Stella of Queen Tetisheri", category: "Egyptian", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png", completionRate: 62 },
        st18: { name: "Ain Ghazal", category: "Ancient", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png", completionRate: 78 },
        st19: { name: "Roman Theatre", category: "Roman", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg", completionRate: 58 },
        st21: { name: "Statue Of Liberty", category: "Modern", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png", completionRate: 75 },
        st22: { name: "Rosetta Stone", category: "Egyptian", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png", completionRate: 68 },
        st23: { name: "Van Gough Self-Portrait", category: "Art", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png", completionRate: 73 },
        st24: { name: "Mona Lisa", category: "Art", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png", completionRate: 80 },
      };

      const combinedArtifacts = Object.keys(total).map(st => ({
        name: artifactsMeta[st].name,
        category: artifactsMeta[st].category,
        pic: artifactsMeta[st].pic,
        color: artifactsMeta[st].color,
        completionRate: artifactsMeta[st].completionRate,
        languages: Object.keys(languageMap)
          .map(lang => ({
            ...languageMap[lang],
            value: total[st][lang] || 0,
          }))
          .sort((a, b) => b.value - a.value),
      }));

      setArtifactsData(combinedArtifacts);
      setIsLoading(false);
    }
  }, [data]);

  // now filter by both name and category
  const filteredArtifacts = artifactsData.filter(artifact =>
    artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artifact.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return num.toLocaleString();
    return num.toString();
  };


  if (isLoading) {
    return (
      <Layout bgColor="#1c2429">
        <ArtifactSkeletonLoading />
      </Layout>
    );
  }
  return (
    <Layout bgColor="#1c2429">
      {isLoading ? (
        <ArtifactSkeletonLoading />
      ) : (
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
      )}
    </Layout>
  );
};

export default Artifact;
