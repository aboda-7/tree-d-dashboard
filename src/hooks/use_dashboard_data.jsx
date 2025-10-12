import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState({
    "stored_data": [
        {
            "id": "ZEDZAG_001",
            "device": 0,
            "artifacts": {
                "st1": {
                    "ar": 0,
                    "en": 0,
                    "fr": 0,
                    "sp": 0,
                    "gr": 0,
                    "ja": 0,
                    "ko": 0
                },
                "st2": {
                    "ar": 0,
                    "en": 0,
                    "fr": 0,
                    "sp": 0,
                    "gr": 0,
                    "ja": 0,
                    "ko": 0
                },
                "st3": {
                    "ar": 0,
                    "en": 0,
                    "fr": 0,
                    "sp": 0,
                    "gr": 0,
                    "ja": 0,
                    "ko": 0
                }
            },
            "languages": {
                "ar": 0,
                "en": 0,
                "fr": 0,
                "sp": 0,
                "gr": 0,
                "ja": 0,
                "ko": 0
            }
        }
    ]
});
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (response.ok) {
          const newData = await response.json();
          setData(newData);
          setIsConnected(true);
          setLastUpdate(new Date());
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return { data, isConnected, lastUpdate };
};
