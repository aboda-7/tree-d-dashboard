import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

export const useDashboardData = () => {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem("dashboardData");
    return cached ? JSON.parse(cached) : { stored_data: [] };
  });

  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(() => {
    const cachedTime = localStorage.getItem("dashboardLastUpdate");
    return cachedTime ? new Date(cachedTime) : null;
  });

  useEffect(() => {
    const auth = getAuth();

    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.warn("User not logged in — skipping fetch");
          setIsConnected(false);
          return;
        }

        const token = await user.getIdToken();

        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const newData = await response.json();
          setData(newData);
          setIsConnected(true);
          const now = new Date();
          setLastUpdate(now);

          localStorage.setItem("dashboardData", JSON.stringify(newData));
          localStorage.setItem("dashboardLastUpdate", now.toISOString());
        } else {
          setIsConnected(false);
          console.warn("Backend responded but not OK:", response.status);
        }
      } catch (error) {
        setIsConnected(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return { data, isConnected, lastUpdate };
};
