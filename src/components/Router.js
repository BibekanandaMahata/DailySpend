import React from 'react';
import Home from '@/screens/Home';
import History from '@/screens/History';
import Budgets from '@/screens/Budgets';
import Settings from '@/screens/Settings';
import Auth from '@/screens/Auth';

import Profile from '@/screens/Profile';
import Security from '@/screens/Security';

export default function Router({
  currentTab,
  subScreen,
  isShowingAuth,
  isLoggedIn,
  transactions,
  activeCategoryData,
  themeMode,
  onAddExpense,
  onLogout,
  onResetData,
  setThemeMode,
  setSubScreen,
  setActiveCategoryData,
  setIsShowingAuth,
  setIsLoggedIn,
  isDrawerOpen,
  setIsDrawerOpen,
}) {
  if (isShowingAuth) {
    return (
      <Auth 
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setIsShowingAuth(false);
        }}
        onBack={() => setIsShowingAuth(false)}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    );
  }

  if (subScreen === 'profile') {
    return (
      <Profile 
        onBack={() => setSubScreen(null)}
      />
    );
  }

  if (subScreen === 'security') {
    return (
      <Security 
        onBack={() => setSubScreen(null)}
      />
    );
  }

  switch (currentTab) {
    case 'Home':
      return <Home transactions={transactions} onAddExpense={onAddExpense} />;
    case 'History':
      return <History transactions={transactions} />;
    case 'Budgets':
      return (
        <Budgets 
          transactions={transactions} 
          onCategoryPress={(cat) => {
            setActiveCategoryData(cat);
            setSubScreen('budget-details');
          }} 
        />
      );
    case 'Settings':
      return (
        <Settings 
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onResetData={onResetData}
          onNavigate={(screen) => setSubScreen(screen)}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
        />
      );
    default:
      return <Home transactions={transactions} onAddExpense={onAddExpense} />;
  }
}
