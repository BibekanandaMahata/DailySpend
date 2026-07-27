import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkTheme } from '@/theme';

const ASYNC_STORAGE_THEME_KEY = '@theme_mode';

const ThemeContext = createContext({
  theme: LightTheme,
  themeMode: 'system', // 'light' | 'dark' | 'system'
  isDarkMode: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState('system');
  const [loading, setLoading] = useState(true);

  // Load persisted theme preference from AsyncStorage
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const storedThemeMode = await AsyncStorage.getItem(ASYNC_STORAGE_THEME_KEY);
        if (storedThemeMode) {
          setThemeModeState(storedThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme mode from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadThemeMode();
  }, []);

  // Update theme mode state and persist it
  const setThemeMode = async (mode) => {
    if (mode !== 'light' && mode !== 'dark' && mode !== 'system') {
      return;
    }
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(ASYNC_STORAGE_THEME_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme mode to AsyncStorage:', error);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (themeMode === 'system') {
      const nextMode = systemColorScheme === 'dark' ? 'light' : 'dark';
      setThemeMode(nextMode);
    } else {
      const nextMode = themeMode === 'dark' ? 'light' : 'dark';
      setThemeMode(nextMode);
    }
  };

  // Determine if dark mode is active
  const isDarkMode = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        isDarkMode,
        setThemeMode,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
