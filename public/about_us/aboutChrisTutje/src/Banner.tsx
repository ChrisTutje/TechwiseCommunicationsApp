import React from 'react';
import { colorPalette } from './ColorPalette';

const WelcomeBanner: React.FC = () => (
  <div className="welcome-banner" style={{ backgroundColor: colorPalette.cobalt, color: colorPalette.offWhite }}>
    <h1>Welcome to my Resume</h1>
  </div>
);

export default WelcomeBanner;
