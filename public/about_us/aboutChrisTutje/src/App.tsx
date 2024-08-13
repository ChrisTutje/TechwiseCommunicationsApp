import React from 'react';
import './App.css';
import { ThemeProvider } from './BackgroundThemes';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        {}
      </div>
    </ThemeProvider>
  );
};

export default App;
