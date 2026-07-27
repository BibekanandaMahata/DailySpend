import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import Dashboard from '@/screens/Dashboard';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <Dashboard />
        </CurrencyProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
