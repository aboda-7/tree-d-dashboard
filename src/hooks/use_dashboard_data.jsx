import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState({
    stored_data: []
  });

  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make sure REACT_APP_API_URL = "http://localhost:8000" in your .env
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (response.ok) {
          const newData = await response.json();
          setData(newData);
          setIsConnected(true);
          setLastUpdate(new Date());
        } else {
          setIsConnected(false);
          console.warn("Backend responded but not OK:", response.status);
        }
      } catch (error) {
        setIsConnected(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return { data, isConnected, lastUpdate };
};
