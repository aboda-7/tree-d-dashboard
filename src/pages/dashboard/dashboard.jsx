import React, { useEffect, useState } from 'react';
import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import LanguageInteractionsSection from './components/language_interactions_section';
import ArtifactInteractionsSection from './components/artifact_interactions_section';
import Footer from '../../shared/components/footer';
import { useDashboardData } from '../../hooks/use_dashboard_data';
import { formatNumber, formatNumberArtifact } from '../../utils/formatters';
import SkeletonLoading from './components/skeleton-loading';

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && data.stored_data && data.stored_data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Layout bgColor="#1c2429">
        <SkeletonLoading />
      </Layout>
    );
  }

  // initialize totals
  const totalLanguages = {
    ar: 0, en: 0, fr: 0, zh: 0, nl: 0
  };

  const totalArtifacts = {
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

  // go through every device
  data.stored_data.forEach(device => {
    // ✅ fix: use 'language' instead of 'languages'
    const langs = device.language || {};

    Object.keys(totalLanguages).forEach(lang => {
      totalLanguages[lang] += langs[lang] || 0;
    });

    const artifacts = device.artifacts || {};
    Object.keys(totalArtifacts).forEach(st => {
      Object.keys(totalArtifacts[st]).forEach(lang => {
        totalArtifacts[st][lang] += artifacts?.[st]?.[lang] || 0;
      });
    });
  });

  const langInfoMap = {
    ar: { name: "Arabic", color: "#E85D75", flag: "/assets/Flags/arabic7.png" },
    en: { name: "English", color: "#4A90E2", flag: "/assets/Flags/england.png" },
    fr: { name: "French", color: "#BD10E0", flag: "/assets/Flags/french.png" },
    zh: { name: "Chinese", color: "#7B68EE", flag: "/assets/Flags/china.png" },
    nl: { name: "Dutch", color: "#FF6B9D", flag: "/assets/Flags/netherlands.png" },
  };

  const languages = Object.keys(totalLanguages)
    .map(lang => ({
      ...langInfoMap[lang],
      value: totalLanguages[lang] || 0
    }))
    .sort((a, b) => b.value - a.value);

  const st15 = Object.values(totalArtifacts.st15 || {}).reduce((a, b) => a + b, 0);
  const st16 = Object.values(totalArtifacts.st16 || {}).reduce((a, b) => a + b, 0);
  const st17 = Object.values(totalArtifacts.st17 || {}).reduce((a, b) => a + b, 0);
  const st18 = Object.values(totalArtifacts.st18 || {}).reduce((a, b) => a + b, 0);
  const st19 = Object.values(totalArtifacts.st19 || {}).reduce((a, b) => a + b, 0);
  const st21 = Object.values(totalArtifacts.st21 || {}).reduce((a, b) => a + b, 0);
  const st22 = Object.values(totalArtifacts.st22 || {}).reduce((a, b) => a + b, 0);
  const st23 = Object.values(totalArtifacts.st23 || {}).reduce((a, b) => a + b, 0);
  const st24 = Object.values(totalArtifacts.st24 || {}).reduce((a, b) => a + b, 0);

  const allArtifacts = [
    { name: "Ain Ghazal", value: st18, color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png" },
    { name: "Imhotep", value: st15, color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png" },
    { name: "Roman Theatre", value: st19, color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg" },
    { name: "Stella of Queen Tetisheri", value: st17, color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png" },
    { name: "Mona Lisa", value: st24, color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png" },
    { name: "Van Gough Self-Portrait", value: st23, color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png" },
    { name: "Rosetta Stone", value: st22, color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png" },
    { name: "Osoris", value: st16, color: "#B8926A", pic: "/assets/Artifacts/Osoris.png" },
    { name: "Statue Of Liberty", value: st21, color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png" }
  ];

  const artifacts = allArtifacts
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

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
