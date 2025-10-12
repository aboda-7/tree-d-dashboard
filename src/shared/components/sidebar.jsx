import React, { useState, useEffect } from 'react';
import SidebarButton from './sidebar_button';
import '../style/sidebar_style.css';
import { useLocation } from "react-router-dom";

const Sidebar = ({ bgColor, onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  // Notify parent component when expansion state changes
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, [isExpanded, onExpandChange]);

  return (
    <div 
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: bgColor }}
    >
      <div className={`logo ${isExpanded ? "expanded" : ""}`}>
        {isExpanded ?
          <img src="/assets/logo-expanded.png" alt="Logo" className="logo-image"/>
          :
          <img src="/assets/logo.png" alt="Logo" className="logo-image" />
        }
      </div>

      <div className="nav-icons">
        <SidebarButton 
          icon={location.pathname === "/" 
            ? "/assets/Sidebar/Home-Black.png" 
            : "/assets/Sidebar/Home-White.png"
          }
          label="Home" 
          isExpanded={isExpanded}
          active={location.pathname === "/"}
          to="/"
        />
        <SidebarButton 
          icon={location.pathname === "/artifacts" 
            ? "/assets/Sidebar/Artifact-Black.png" 
            : "/assets/Sidebar/Artifact-White.png"
          }
          label="Artifacts" 
          isExpanded={isExpanded}
          active={location.pathname === "/artifacts"}
          to="/artifacts"
        />
        <SidebarButton 
          icon={location.pathname === "/languages" 
            ? "/assets/Sidebar/Languages-Black.png" 
            : "/assets/Sidebar/Languages-White.png"
          }
          label="Languages" 
          isExpanded={isExpanded}
          active={location.pathname === "/languages"}
          to="/languages"
        />
        <SidebarButton 
          icon={location.pathname === "/handsets" 
            ? "/assets/Sidebar/Handset-Black.png" 
            : "/assets/Sidebar/Handset-White.png"
          }
          label="Handsets" 
          isExpanded={isExpanded}
          active={location.pathname === "/handsets"}
          to="/handsets"
        />
      </div>

    </div>
  );
};

export default Sidebar;