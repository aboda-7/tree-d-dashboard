import React, { useEffect, useState } from 'react';
import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import Footer from '../../shared/components/footer';
import ArtifactCard from './components/artifact-card';
import SearchBar from './components/search-bar';
import ArtifactSkeletonLoading from './components/artifact-skeleton-loading';
import { useDashboardData } from '../../hooks/use_dashboard_data';

const BASE_URL = 'http://localhost:8000'; // change if your backend is different
const TARGET_LANGUAGE = 'ar'; // change if you want another language

const Artifact = () => {
  useEffect(() => {
    document.title = "Artifacts | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();
  const [artifactsData, setArtifactsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [completionRates, setCompletionRates] = useState([]);

  // Fetch completion rates from backend (with Bearer token + ts)
  useEffect(() => {
    const fetchCompletionRates = async () => {
      try {
        const token = localStorage.getItem('token'); // ensure token is stored here
        const ts = Date.now();

        const res = await fetch(`${BASE_URL}/analytics/completion-summary?ts=${ts}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          // helpful debugging
          const txt = await res.text().catch(() => '');
          throw new Error(`HTTP error ${res.status} ${res.statusText} - ${txt}`);
        }

        const json = await res.json();

        // ---- FIX: backend returns by_artifact (not completion_rates) in your sample ----
        // Fall back to completion_rates if your backend sometimes uses that key.
        const rates = json.by_artifact || json.completion_rates || [];
        console.log('completion summary response:', json);
        setCompletionRates(rates); // array of { artifact, language, completion_rate, ... }
      } catch (err) {
        console.error('Error fetching completion rates:', err);
        setCompletionRates([]); // be explicit
      }
    };

    fetchCompletionRates();
  }, []);

  useEffect(() => {
    if (!data?.stored_data) return;

    // prepare totals per artifact/language from your stored data
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
      ar: { name: 'Arabic', color: '#E85D75', flag: '/assets/Flags/arabic7.png' },
      en: { name: 'English', color: '#4A90E2', flag: '/assets/Flags/england.png' },
      fr: { name: 'French', color: '#BD10E0', flag: '/assets/Flags/french.png' },
      zh: { name: 'Chinese', color: '#7B68EE', flag: '/assets/Flags/china.png' },
      nl: { name: 'Dutch', color: '#FF6B9D', flag: '/assets/Flags/netherlands.png' },
    };

    const artifactsMeta = {
      st15: { name: 'Imhotep', category: 'Egyptian', color: '#C17F5D', pic: '/assets/Artifacts/Imhotep.png' },
      st16: { name: 'Osoris', category: 'Egyptian', color: '#B8926A', pic: '/assets/Artifacts/Osoris.png' },
      st17: { name: 'Stella of Queen Tetisheri', category: 'Egyptian', color: '#9B8B7E', pic: '/assets/Artifacts/Tetisheri.png' },
      st18: { name: 'Ain Ghazal', category: 'Ancient', color: '#8B7355', pic: '/assets/Artifacts/ain_ghazal.png' },
      st19: { name: 'Roman Theatre', category: 'Roman', color: '#A0826D', pic: '/assets/Artifacts/Roman-Theatre.jpg' },
      st21: { name: 'Statue Of Liberty', category: 'Modern', color: '#D4A574', pic: '/assets/Artifacts/Statue-Of-Liberty.png' },
      st22: { name: 'Rosetta Stone', category: 'Egyptian', color: '#9B8B7E', pic: '/assets/Artifacts/Rosetta-Stone.png' },
      st23: { name: 'Van Gough Self-Portrait', category: 'Art', color: '#D4A574', pic: '/assets/Artifacts/Van-Gough.png' },
      st24: { name: 'Mona Lisa', category: 'Art', color: '#B8926A', pic: '/assets/Artifacts/Mona-Lisa.png' },
    };

    const combinedArtifacts = Object.keys(total).map(st => {
      // match both artifact id AND language (so we get the right language's rate)
      const match = completionRates.find(
        (r) => r.artifact === st && r.language === TARGET_LANGUAGE
      );

      // if not found => 0 (per your request)
      const backendRate = match?.completion_rate ?? 0;

      return {
        id: st,
        name: artifactsMeta[st].name,
        category: artifactsMeta[st].category,
        pic: artifactsMeta[st].pic,
        color: artifactsMeta[st].color,
        completionRate: backendRate,
        languages: Object.keys(languageMap)
          .map(lang => ({
            code: lang,
            ...languageMap[lang],
            value: total[st][lang] || 0,
          }))
          .sort((a, b) => b.value - a.value),
      };
    });

    setArtifactsData(combinedArtifacts);
    setIsLoading(false);
  }, [data, completionRates]);

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
              key={artifact.id}
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
