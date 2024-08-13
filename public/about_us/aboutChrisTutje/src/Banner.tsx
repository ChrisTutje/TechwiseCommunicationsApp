import React from 'react';
import './colorPalette.css';

const WelcomeBanner: React.FC = () => (
  <div
    className="welcome-banner"
    style={{ backgroundColor:'var(--red)', color: 'var(--offWhite)' }}
  >
    <h1>Welcome to my Resume</h1>
  </div>
);

export default WelcomeBanner;
