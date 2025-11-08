import React, { useState, useMemo, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Layout from "../../shared/components/layout";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Mock MUI Autocomplete with dropdown
const Autocomplete = ({ multiple, options, value, onChange, label, disabled, sx, limitTags }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option) => {
    if (!multiple) {
      onChange(null, option);
      setOpen(false);
      return;
    }

    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    
    if (newValue.length > 0) {
      onChange(null, newValue);
    }
  };

  const removeOption = (option, e) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== option);
    if (newValue.length > 0 || !multiple) {
      onChange(null, newValue);
    }
  };

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  const displayedTags = limitTags ? value.slice(0, limitTags) : value;
  const hiddenCount = limitTags && value.length > limitTags ? value.length - limitTags : 0;

  return (
    <div ref={dropdownRef} style={{ ...sx, position: 'relative' }}>
      <label style={{ 
        position: 'absolute', 
        top: '-8px', 
        left: '12px', 
        backgroundColor: 'white', 
        padding: '0 4px',
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }}>
        {label}
      </label>
      
      <div
        onClick={() => !disabled && setOpen(!open)}
        style={{
          minHeight: '35px',
          padding: '8px 14px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '8px',
          fontSize: '16px',
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: disabled ? '#f5f5f5' : 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        {multiple && value.length > 0 ? (
          <>
            {displayedTags.map(item => (
              <span
                key={item}
                style={{
                  backgroundColor: '#e3f2fd',
                  padding: '4px 8px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {item}
                <span
                  onClick={(e) => removeOption(item, e)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    lineHeight: '14px',
                  }}
                >
                  ×
                </span>
              </span>
            ))}
            {hiddenCount > 0 && (
              <span style={{ fontSize: '14px', color: '#666' }}>
                +{hiddenCount} more
              </span>
            )}
          </>
        ) : !multiple && value ? (
          <span>{value}</span>
        ) : (
          <span style={{ color: '#999' }}>Select {label.toLowerCase()}</span>
        )}
      </div>

      {open && !disabled && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search..."
            style={{
              width: 'calc(100% - 24px)',
              padding: '8px 12px',
              margin: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: "'Montserrat', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {filteredOptions.map(option => {
            const isSelected = multiple ? value.includes(option) : value === option;
            return (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.target.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.target.style.backgroundColor = 'transparent';
                }}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                )}
                {option}
              </div>
            );
          })}
          {filteredOptions.length === 0 && (
            <div style={{ padding: '16px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DayPicker = ({ mode, selected, onSelect, disabled }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  
  const handleDateClick = (day) => {
    if (!day) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (disabled?.before && newDate < disabled.before) return;
    if (disabled?.after && newDate > disabled.after) return;
    
    onSelect(newDate);
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  return (
    <div style={{ padding: '16px', userSelect: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
        <button onClick={prevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>←</button>
        <span style={{ fontWeight: '600' }}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={nextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>→</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} style={{ fontWeight: '600', fontSize: '12px', padding: '8px' }}>{day}</div>
        ))}
        {days.map((day, idx) => {
          const isSelected = day && selected && 
            day === selected.getDate() && 
            currentMonth.getMonth() === selected.getMonth() &&
            currentMonth.getFullYear() === selected.getFullYear();
          
          const dateToCheck = day ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) : null;
          const isDisabled = dateToCheck && (
            (disabled?.before && dateToCheck < disabled.before) ||
            (disabled?.after && dateToCheck > disabled.after)
          );
          
          return (
            <div
              key={idx}
              onClick={() => !isDisabled && handleDateClick(day)}
              style={{
                padding: '8px',
                cursor: day && !isDisabled ? 'pointer' : 'default',
                backgroundColor: isSelected ? '#1976d2' : 'transparent',
                color: isSelected ? 'white' : isDisabled ? '#ccc' : 'inherit',
                borderRadius: '50%',
                fontWeight: isSelected ? '600' : '400',
              }}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Analytics = () => {
  const [selectedLanguages, setSelectedLanguages] = useState(["English"]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 28);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(null); // 'start' or 'end' or null
  const [timeframe, setTimeframe] = useState("daily");
  
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const artifactColors = {
    "st1": "#FF6B6B", "st2": "#4ECDC4", "st3": "#45B7D1", "st4": "#FFA07A",
    "st5": "#98D8C8", "st6": "#6C5CE7", "st7": "#A29BFE", "st8": "#74B9FF",
    "st9": "#FDCB6E", "st11": "#E17055", "st12": "#00B894", "st13": "#00CEC9",
    "st14": "#0984E3", "st15": "#6C5CE7", "st16": "#FD79A8", "st17": "#FDCB6E",
    "st18": "#E17055", "st19": "#74B9FF", "st21": "#A29BFE", "st22": "#FF6B6B",
    "st23": "#4ECDC4", "st24": "#45B7D1",
  };

  const langKeyToName = {
    "ar": "Arabic", "en": "English", "fr": "French", "sp": "Spanish",
    "de": "German", "ja": "Japanese", "ko": "Korean", "ru": "Russian",
    "nl": "Dutch", "zh": "Chinese",
  };

  useEffect(() => {
    fetchInteractions();
  }, [startDate, endDate]);

  useEffect(() => {
    const handleGlobalClick = (event) => {
      // Close date pickers when clicking outside
      const isDateButton = event.target.closest('button')?.textContent?.includes('Start:') || 
                          event.target.closest('button')?.textContent?.includes('End:');
      const isDatePicker = event.target.closest('[data-date-picker]');
      
      if (!isDateButton && !isDatePicker) {
        setOpenDatePicker(null);
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const fetchInteractions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const response = await fetch(
        `${API_BASE_URL}/analytics/interactions?start_date=${startDateStr}&end_date=${endDateStr}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setInteractions(data.interactions || []);
    } catch (err) {
      console.error("Error fetching interactions:", err);
      setError(err.message);
      setInteractions(generateMockData());
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    const mockData = [];
    const artifacts = ["Ain Ghazal", "Atargatis", "Misha Stele", "Roman Theatre"];
    const languages = ["en", "ar", "fr"];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        const artifact = artifacts[Math.floor(Math.random() * artifacts.length)];
        mockData.push({
          date: d.toISOString().split('T')[0],
          artifact: `st${Math.floor(Math.random() * 24) + 1}`,
          artifact_name: artifact,
          language: languages[Math.floor(Math.random() * languages.length)],
          timestamp: d.toISOString(),
        });
      }
    }
    return mockData;
  };

  const { availableArtifacts, availableLanguages } = useMemo(() => {
    const artifacts = new Map();
    const languages = new Set();
    
    interactions.forEach(interaction => {
      if (interaction.artifact && interaction.artifact_name) {
        artifacts.set(interaction.artifact_name, interaction.artifact);
      }
      if (interaction.language) {
        const langName = langKeyToName[interaction.language] || interaction.language_name || interaction.language;
        languages.add(langName);
      }
    });
    
    return {
      availableArtifacts: Array.from(artifacts.entries())
        .map(([name, key]) => ({ key, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      availableLanguages: Array.from(languages).sort()
    };
  }, [interactions]);

  const getDateKey = (dateStr, timeframeType) => {
    const date = new Date(dateStr);
    
    switch (timeframeType) {
      case "weekly":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay() + 1);
        return weekStart.toISOString().split('T')[0];
      case "monthly":
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      case "annually":
        return String(date.getFullYear());
      default:
        return dateStr;
    }
  };

  const generateDateRange = () => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (timeframe === "daily") {
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]);
      }
    } else if (timeframe === "weekly") {
      const weeks = new Set();
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        weeks.add(getDateKey(d.toISOString().split('T')[0], "weekly"));
      }
      dates.push(...Array.from(weeks).sort());
    } else if (timeframe === "monthly") {
      const months = new Set();
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        months.add(getDateKey(d.toISOString().split('T')[0], "monthly"));
      }
      dates.push(...Array.from(months).sort());
    } else if (timeframe === "annually") {
      const years = new Set();
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        years.add(getDateKey(d.toISOString().split('T')[0], "annually"));
      }
      dates.push(...Array.from(years).sort());
    }
    
    return dates;
  };

  const allDates = useMemo(() => generateDateRange(), [startDate, endDate, timeframe]);

  const chartData = useMemo(() => {
    if (selectedArtifacts.length === 0) return [];
    
    const counts = {};
    allDates.forEach(date => {
      counts[date] = {};
    });
    
    interactions.forEach(interaction => {
      const artifactName = interaction.artifact_name;
      const langKey = interaction.language;
      const langName = langKeyToName[langKey] || interaction.language_name || langKey;
      
      if (!artifactName || !langName) return;
      if (!selectedArtifacts.includes(artifactName)) return;
      if (!selectedLanguages.includes(langName)) return;
      
      const dateKey = getDateKey(interaction.date, timeframe);
      
      if (!counts[dateKey]) counts[dateKey] = {};
      
      const dataKey = `${artifactName}_${langName}`;
      if (!counts[dateKey][dataKey]) counts[dateKey][dataKey] = 0;
      counts[dateKey][dataKey]++;
    });
    
    return allDates.map(date => {
      const entry = { date };
      
      selectedArtifacts.forEach(artifactName => {
        selectedLanguages.forEach(langName => {
          const dataKey = `${artifactName}_${langName}`;
          entry[dataKey] = counts[date]?.[dataKey] || 0;
        });
      });
      
      return entry;
    });
  }, [interactions, selectedArtifacts, selectedLanguages, allDates, timeframe]);

  const bars = useMemo(() => {
    return selectedArtifacts.flatMap(artifactName => 
      selectedLanguages.map(langName => {
        const artifactObj = availableArtifacts.find(a => a.name === artifactName);
        const artifactKey = artifactObj?.key || "";
        const dataKey = `${artifactName}_${langName}`;
        
        return {
          dataKey,
          name: `${artifactName} (${langName})`,
          fill: artifactColors[artifactKey] || "#999999",
          stackId: langName,
        };
      })
    );
  }, [selectedArtifacts, selectedLanguages, availableArtifacts]);

  const exportToExcel = () => {
    if (selectedArtifacts.length === 0 || chartData.length === 0) return;
    
    const excelData = chartData.map(row => {
      const newRow = { Date: row.date };
      selectedArtifacts.forEach(artifact => {
        selectedLanguages.forEach(language => {
          const key = `${artifact}_${language}`;
          newRow[`${artifact} (${language})`] = row[key] || 0;
        });
      });
      return newRow;
    });
    
    const headers = ['Date', ...selectedArtifacts.flatMap(artifact => 
      selectedLanguages.map(lang => `${artifact} (${lang})`)
    )];
    
    const csvContent = [
      headers.join(','),
      ...excelData.map(row => 
        headers.map(header => row[header] || 0).join(',')
      )
    ].join('\n');
    
    const metadata = [
      'Chart Details',
      `Languages: ${selectedLanguages.join(', ')}`,
      `Timeframe: ${timeframe}`,
      `Date Range: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
      `Artifacts: ${selectedArtifacts.join(', ')}`,
      '',
      ''
    ].join('\n');
    
    const fullContent = metadata + csvContent;
    
    const blob = new Blob([fullContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `artifact_scans_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Layout bgColor="#1c2429">
      <div style={{ padding: "40px", backgroundColor: "#F5F7FA", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1c2429", marginBottom: "32px" }}>
            Artifact Interactions
          </h1>

          {error && (
            <div style={{ padding: "16px", backgroundColor: "#fee", border: "1px solid #fcc", borderRadius: "8px", marginBottom: "24px", color: "#c33" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button
              onClick={exportToExcel}
              disabled={selectedArtifacts.length === 0 || loading}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedArtifacts.length === 0 || loading ? "#e0e0e0" : "#1976d2",
                color: selectedArtifacts.length === 0 || loading ? "#9e9e9e" : "white",
                border: "none",
                borderRadius: "8px",
                cursor: selectedArtifacts.length === 0 || loading ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Export to Excel
            </button>
          </div>

          <div style={{ display: "flex", gap: "24px", marginBottom: "40px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <Autocomplete
              multiple
              options={availableLanguages}
              value={selectedLanguages}
              onChange={(e, newValue) => { if (newValue.length > 0) setSelectedLanguages(newValue); }}
              label="Languages"
              disabled={loading || availableLanguages.length === 0}
              sx={{ width: '250px' }}
              limitTags={2}
            />

            <Autocomplete
              multiple
              options={availableArtifacts.map(a => a.name)}
              value={selectedArtifacts}
              onChange={(e, newValue) => setSelectedArtifacts(newValue)}
              label="Artifacts"
              disabled={loading || availableArtifacts.length === 0}
              sx={{ width: '300px' }}
              limitTags={2}
            />

            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDatePicker(openDatePicker === 'start' ? null : 'start');
                }}
                disabled={loading}
                style={{
                  minWidth: '200px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                Start: {formatDate(startDate)}
              </button>
              {openDatePicker === 'start' && (
                <div 
                  data-date-picker
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '8px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000
                  }}>
                  <DayPicker
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => { 
                      if (date) { 
                        setStartDate(date); 
                        setOpenDatePicker(null); 
                      }
                    }}
                    disabled={{ after: endDate }}
                  />
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDatePicker(openDatePicker === 'end' ? null : 'end');
                }}
                disabled={loading}
                style={{
                  minWidth: '200px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                End: {formatDate(endDate)}
              </button>
              {openDatePicker === 'end' && (
                <div 
                  data-date-picker
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '8px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000
                  }}>
                  <DayPicker
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => { 
                      if (date) { 
                        setEndDate(date); 
                        setOpenDatePicker(null); 
                      }
                    }}
                    disabled={{ before: startDate }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f0f0f0', padding: '4px', borderRadius: '10px' }}>
              {['daily', 'weekly', 'monthly', 'annually'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  disabled={loading}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: timeframe === tf ? 'white' : 'transparent',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#000',
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: timeframe === tf ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tf[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #1976d2', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: "#666", fontFamily: "'Montserrat', sans-serif" }}>Loading interactions...</p>
              </div>
            ) : interactions.length === 0 ? (
              <p style={{ fontSize: "18px", color: "#666", fontFamily: "'Montserrat', sans-serif" }}>No interactions found in the selected date range</p>
            ) : selectedArtifacts.length === 0 ? (
              <p style={{ fontSize: "18px", color: "#666", fontFamily: "'Montserrat', sans-serif" }}>Please select at least one artifact to view the chart</p>
            ) : (
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <YAxis 
                    label={{ value: "Number of Interactions", angle: -90, position: "insideLeft", style: { fontFamily: "'Montserrat', sans-serif" } }}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif" }} />
                  {/* <Legend wrapperStyle={{ paddingTop: "20px", fontFamily: "'Montserrat', sans-serif" }} /> */}
                  {bars.map(bar => (
                    <Bar key={bar.dataKey} {...bar} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Analytics;