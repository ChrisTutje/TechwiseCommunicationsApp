import React from 'react';
import './colorPalette.css';
import colorScheme from './colorScheme';

const WelcomeBanner: React.FC = () => (
  <div
    className="welcome-banner"
    style={{ backgroundColor: colorScheme.base, color: 'var(--offwhite)' }}
  >
    <h1>Welcome to my Resume</h1>
  </div>
);

export default WelcomeBanner;
