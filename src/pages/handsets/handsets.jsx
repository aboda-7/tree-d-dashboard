import Layout from '../../shared/components/layout';
import Header from '../../shared/components/header';
import DashboardFooter from '../../shared/components/footer';
import { useDashboardData } from '../../hooks/use_dashboard_data';
import HandsetGrid from './components/handset-grid';
import { useEffect } from "react";

const Handsets = () => {

  useEffect(() => {
    document.title = "Handsets | Tree'd Admin Panel";
  }, []);

  const { data, isConnected, lastUpdate } = useDashboardData();

  return (
    <Layout bgColor="#1c2429">
      <div style={{
        padding: '40px',
        backgroundColor: '#F5F7FA',
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif"
      }}>
        <Header 
          title={"Handsets"}
          battery={data.Battery} 
          isConnected={isConnected} 
        />
        <HandsetGrid /> 
        <DashboardFooter lastUpdate={lastUpdate} />
      </div>
    </Layout>
  );
};

export default Handsets;