import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/contexts/ThemeContext';
import AppText from '@/components/AppText';
import Box from '@/components/Box';
import AppScaffold from '@/components/AppScaffold';
import TabBar from '@/components/TabBar';
import Router from '@/components/Router';
import Sidebar from '@/components/Sidebar';
import Icon from '@/components/Icon';
import AnimatedMenuIcon from '@/components/AnimatedMenuIcon';
import TABS from '@/json/tabs.json';

const STORAGE_KEY = '@transactions';

export default function Dashboard() {
  const { theme, isDarkMode, themeMode, setThemeMode } = useTheme();
  const [currentTab, setCurrentTab] = useState('Home');
  const [transactions, setTransactions] = useState([]);
  const [isShowingAuth, setIsShowingAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subScreen, setSubScreen] = useState(null);
  const [activeCategoryData, setActiveCategoryData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Ensure theme is set to system on initial mount
  useEffect(() => {
    setThemeMode('system');
  }, []);

  // Load transactions dynamically from storage and clean legacy mock data
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Purge legacy mock data if present in AsyncStorage
          const clean = parsed.filter(
            (t) =>
              !['1', '2', '3', '4'].includes(t.id) &&
              t.title !== 'Sweetgreen' &&
              t.title !== 'Uber' &&
              t.title !== 'ConEdison' &&
              t.title !== 'Amazon Purchase'
          );
          setTransactions(clean);
          if (clean.length !== parsed.length) {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
          }
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error('Failed to load transactions:', error);
        setTransactions([]);
      }
    };
    loadTransactions();
  }, []);

  // Handle adding a new expense
  const handleAddExpense = async (newExpense) => {
    const dateStr = `${newExpense.category} • Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const createdExpense = {
      id: Date.now().toString(),
      title: newExpense.title,
      category: newExpense.category,
      amount: newExpense.amount,
      date: dateStr,
      icon: newExpense.icon,
    };

    const updated = [createdExpense, ...transactions];
    setTransactions(updated);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  // Handle resetting all application data
  const handleResetData = async () => {
    setTransactions([]);
    try {
      await AsyncStorage.multiRemove(['@transactions', '@total_budget', '@category_limits']);
    } catch (error) {
      console.error('Failed to reset storage:', error);
    }
  };

  // Header Component (Unified across screen layouts)
  const renderHeader = () => {
    if (subScreen) return null;

    return (
      <Box row align="center" justify="space-between" px="containerMargin" py={12} bg={theme.colors.background}>
        <Box row align="center" gap={10}>
          <AnimatedMenuIcon 
            onPress={() => setIsDrawerOpen(!isDrawerOpen)} 
            color={theme.colors.primary}
            size={22}
          />
          <AppText variant="headlineLg" color="primary" style={{ fontWeight: '800', letterSpacing: -0.5 }}>
            {isShowingAuth ? 'DailySpend' : (currentTab === 'Home' ? 'DailySpend' : currentTab)}
          </AppText>
        </Box>

        {isShowingAuth ? (
          <TouchableOpacity onPress={() => setIsShowingAuth(false)} activeOpacity={0.7}>
            <Box row align="center" gap={4}>
              <Box style={{ transform: [{ rotate: '180deg' }] }}>
                <Icon name="chevron-right" color={theme.colors.primary} size={16} />
              </Box>
              <AppText variant="labelSm" color="primary" style={{ fontWeight: '600' }}>
                Back
              </AppText>
            </Box>
          </TouchableOpacity>
        ) : isLoggedIn ? (
          <Box width={32} height={32} radius="full" bg="primaryContainer" justify="center" align="center">
            <AppText variant="labelXs" color="onPrimaryContainer" style={{ fontWeight: '700' }}>DS</AppText>
          </Box>
        ) : (
          <TouchableOpacity onPress={() => setIsShowingAuth(true)} activeOpacity={0.7}>
            <AppText variant="labelSm" color="primary" style={{ fontWeight: '600' }}>
              Sign In
            </AppText>
          </TouchableOpacity>
        )}
      </Box>
    );
  };

  const hideNavigation = isShowingAuth || subScreen;

  return (
    <AppScaffold 
      scrollable={!hideNavigation}
      appBar={renderHeader()} 
      bottomNavigationBar={hideNavigation ? null : (
        <TabBar 
          currentTab={currentTab} 
          onTabPress={setCurrentTab} 
          tabs={TABS} 
        />
      )}
      drawer={(
        <Sidebar 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={(route) => {
            if (route === 'Home' || route === 'History' || route === 'Budgets' || route === 'Settings') {
              setCurrentTab(route);
              setSubScreen(null);
            } else if (route === 'About' || route === 'Privacy') {
              alert(`Navigating to ${route}`);
            }
          }}
        />
      )}
      drawerOpen={isDrawerOpen}
      onDrawerClose={() => setIsDrawerOpen(false)}
    >
      <Router 
        currentTab={currentTab}
        subScreen={subScreen}
        isShowingAuth={isShowingAuth}
        isLoggedIn={isLoggedIn}
        transactions={transactions}
        activeCategoryData={activeCategoryData}
        themeMode={themeMode}
        onAddExpense={handleAddExpense}
        onLogout={() => setIsLoggedIn(false)}
        onResetData={handleResetData}
        setThemeMode={setThemeMode}
        setSubScreen={setSubScreen}
        setActiveCategoryData={setActiveCategoryData}
        setIsShowingAuth={setIsShowingAuth}
        setIsLoggedIn={setIsLoggedIn}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </AppScaffold>
  );
}
