import { useNavigate } from "react-router-dom";
import '../style/sidebar_button_style.css';

const SidebarButton = ({ icon, label, active = false, isExpanded, to }) => {
  const navigate = useNavigate();

  return (
    <button 
      className={`nav-btn ${active ? "active" : ""}`} 
      onClick={() => navigate(to)}
    >
      <img src={icon} alt={label} />
      <span className={`label ${isExpanded ? 'visible' : ''}`}>{label}</span>
    </button>
  );
};

export default SidebarButton;
