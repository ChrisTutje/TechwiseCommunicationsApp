import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import './colorPalette.css';
import WelcomeBanner from './Banner';
import ResumeContent from './Resume';

interface ThemeContextType {
  backgroundColor: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const Content: React.FC = () => {
  const { backgroundColor, toggleTheme } = useTheme();
  const [isResumeVisible, setIsResumeVisible] = useState(false);
  const [themeText, setThemeText] = useState<'Hacker Mode' | 'Normie Mode'>('Hacker Mode');

  const toggleResumeVisibility = () => {
    setIsResumeVisible(!isResumeVisible);
  };

  const toggleThemeVisibility = () => {
    toggleTheme();
    setThemeText(themeText === 'Hacker Mode' ? 'Normie Mode' : 'Hacker Mode');
  };

  return (
    <div className={`content ${isResumeVisible ? 'show-resume' : ''}`} style={{ backgroundColor: backgroundColor }}>
      <WelcomeBanner />
      
      <nav>
        <button onClick={toggleResumeVisibility}>
          {isResumeVisible ? 'Hide Resume' : 'Show Resume'}
        </button>
        <button onClick={toggleThemeVisibility} className="theme-toggle">
          {themeText}
        </button>
      </nav>

      {isResumeVisible && <ResumeContent backgroundColor={backgroundColor} />}
    </div>
  );
};

export const ThemeProvider: React.FC<ThemeProviderProps> = () => {
  const [backgroundColor, setBackgroundColor] = useState('var(--offWhite)');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    if (theme === 'light') {
      document.body.style.color = 'var(--automatic)';
    } else {
      document.body.style.color = 'var(--celadon)';
    }
  }, [backgroundColor, theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setBackgroundColor('var(--automatic)');
      setTheme('dark');
    } else {
      setBackgroundColor('var(--offWhite)');
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ backgroundColor, toggleTheme }}>
      <Content />
    </ThemeContext.Provider>
  );
};
