import React from 'react';
import { useNavigate } from 'react-router-dom';
import './not-found.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <img src="/assets/not-found.png" alt="Lost page" className="notfound-image" />
      <h1 className="notfound-title">404 Page Not Found</h1>
      <p className="notfound-description">
        Looks like this page has been lost in history.
      </p>
      <button className="notfound-button" onClick={() => navigate('/')}>
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
