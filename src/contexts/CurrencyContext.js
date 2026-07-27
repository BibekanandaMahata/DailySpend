import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CURRENCIES from '@/json/currencies.json';

const CURRENCY_STORAGE_KEY = '@app_currency';
export { CURRENCIES };

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState('USD');

  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const stored = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
        if (stored && CURRENCIES[stored]) {
          setCurrencyCode(stored);
        }
      } catch (e) {
        console.error('Failed to load currency:', e);
      }
    };
    loadCurrency();
  }, []);

  const changeCurrency = async (code) => {
    if (CURRENCIES[code]) {
      setCurrencyCode(code);
      try {
        await AsyncStorage.setItem(CURRENCY_STORAGE_KEY, code);
      } catch (e) {
        console.error('Failed to save currency:', e);
      }
    }
  };

  const activeCurrency = CURRENCIES[currencyCode];

  const formatCurrency = (amount) => {
    const converted = amount * activeCurrency.rate;
    const absVal = Math.abs(converted).toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
    const sign = amount < 0 ? '-' : '';
    return `${sign}${activeCurrency.symbol}${absVal}`;
  };

  const convertToRaw = (inputAmount) => {
    return inputAmount / activeCurrency.rate;
  };

  return (
    <CurrencyContext.Provider value={{
      currency: currencyCode,
      symbol: activeCurrency.symbol,
      rate: activeCurrency.rate,
      currencies: CURRENCIES,
      setCurrency: changeCurrency,
      formatCurrency,
      convertToRaw,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
