import React, { createContext, useState, useEffect } from 'react';
import './ThemeProvider.css';

// Make sure ThemeContext is created and exported
export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
  
    // Load saved theme from local storage
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }, []);
  
    // Toggle theme
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* Apply the theme class to the root wrapper */}
        <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  };
  
  export default ThemeProvider;
  