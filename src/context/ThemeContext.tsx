import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LightColors, DarkColors, Colors } from '../theme/colors';
import { loadThemeMode, saveThemeMode } from '../storage/userStorage';

interface ThemeContextType {
  mode: 'light' | 'dark';
  colors: Colors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  colors: LightColors,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    loadThemeMode().then(saved => {
      if (saved) setMode(saved);
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      saveThemeMode(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colors: mode === 'light' ? LightColors : DarkColors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
