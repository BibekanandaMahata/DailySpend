import React, { useState } from 'react';
import { TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';

export default function Settings({ isLoggedIn, onLogout, onNavigate, themeMode, setThemeMode, onResetData }) {
  const { theme, isDarkMode } = useTheme();
  const { currency, setCurrency, currencies } = useCurrency();

  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const themeOptions = [
    { label: 'System Default', value: 'system', icon: 'settings' },
    { label: 'Light Mode', value: 'light', icon: 'palette' },
    { label: 'Dark Mode', value: 'dark', icon: 'lock' },
  ];

  const executeReset = async () => {
    try {
      await AsyncStorage.multiRemove(['@transactions', '@total_budget', '@category_limits']);
      if (onResetData) {
        onResetData();
      }
      setIsConfirmingReset(false);
      setShowResetSuccess(true);
      setTimeout(() => setShowResetSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to reset app data:', e);
    }
  };

  const handlePromptReset = () => {
    if (typeof Alert !== 'undefined' && Alert.alert) {
      Alert.alert(
        'Reset All Data?',
        'This will permanently delete all transactions, budget limits, and settings. This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Reset Data', style: 'destructive', onPress: executeReset },
        ]
      );
    } else {
      setIsConfirmingReset(!isConfirmingReset);
    }
  };

  return (
    <Box px="containerMargin" py={8}>
      {/* Toast Notification for Reset Success */}
      {showResetSuccess && (
        <Box 
          p={14} 
          mb={16} 
          radius="lg" 
          bg={isDarkMode ? 'rgba(34, 197, 94, 0.15)' : '#e6f4ea'} 
          row 
          align="center" 
          justify="space-between"
          style={{ borderLeftWidth: 4, borderLeftColor: '#22c55e' }}
        >
          <Box row align="center" gap={8}>
            <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '700', fontSize: 13 }}>
              ✓ All transactions & budget data cleared
            </AppText>
          </Box>
        </Box>
      )}

      {/* Account Hero Card */}
      <Box p={16} radius="xl" bg="surfaceContainerLowest" shadow mb={20}>
        <Box row align="center" justify="space-between">
          <Box row align="center" gap={14}>
            <Box 
              width={48} 
              height={48} 
              radius="full" 
              bg={isDarkMode ? 'primaryContainer' : 'primary'} 
              align="center" 
              justify="center"
              shadow
            >
              <AppText variant="headlineLg" color={isDarkMode ? 'onPrimaryContainer' : 'onPrimary'} style={{ fontWeight: '800', fontSize: 18 }}>
                {isLoggedIn ? 'JD' : 'DS'}
              </AppText>
            </Box>
            <Box>
              <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '700', fontSize: 16 }}>
                {isLoggedIn ? 'John Doe' : 'DailySpend User'}
              </AppText>
              <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 12, marginTop: 2 }}>
                {isLoggedIn ? 'john.doe@example.com' : 'Personal Finance Mode'}
              </AppText>
            </Box>
          </Box>

          <Box px={10} py={4} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'}>
            <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 10, textTransform: 'uppercase' }}>
              {isLoggedIn ? 'Pro Plan' : 'Free Tier'}
            </AppText>
          </Box>
        </Box>
      </Box>

      {/* SECTION 1: ACCOUNT & SECURITY */}
      <Box mb={20}>
        <AppText 
          variant="labelXs" 
          color="onSurfaceVariant" 
          style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8, marginLeft: 4 }}
        >
          Account & Security
        </AppText>
        <Box radius="xl" bg="surfaceContainerLowest" shadow style={{ overflow: 'hidden' }}>
          {/* Profile Row */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('profile')}>
            <Box row align="center" justify="space-between" px={16} py={14} style={{ borderBottomWidth: 1, borderBottomColor: isDarkMode ? theme.colors.surfaceContainerHigh : theme.colors.outlineVariant }}>
              <Box row align="center" gap={12} style={{ flex: 1 }}>
                <Box width={38} height={38} radius="lg" bg={isDarkMode ? 'rgba(0, 88, 188, 0.15)' : '#e0ebf9'} align="center" justify="center">
                  <Icon name="user" color={theme.colors.primary} size={18} />
                </Box>
                <Box style={{ flex: 1 }}>
                  <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600', fontSize: 15 }}>Profile Details</AppText>
                  <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 11, marginTop: 1 }}>Personal information & avatar</AppText>
                </Box>
              </Box>
              <Icon name="chevron-right" color={theme.colors.outline} size={16} />
            </Box>
          </TouchableOpacity>

          {/* Security Row */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('security')}>
            <Box row align="center" justify="space-between" px={16} py={14}>
              <Box row align="center" gap={12} style={{ flex: 1 }}>
                <Box width={38} height={38} radius="lg" bg={isDarkMode ? 'rgba(100, 100, 255, 0.15)' : '#edeefc'} align="center" justify="center">
                  <Icon name="lock" color="#6366f1" size={18} />
                </Box>
                <Box style={{ flex: 1 }}>
                  <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600', fontSize: 15 }}>Security & Authentication</AppText>
                  <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 11, marginTop: 1 }}>Password, PIN & biometric 2FA</AppText>
                </Box>
              </Box>
              <Icon name="chevron-right" color={theme.colors.outline} size={16} />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

      {/* SECTION 2: PREFERENCES */}
      <Box mb={20}>
        <AppText 
          variant="labelXs" 
          color="onSurfaceVariant" 
          style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8, marginLeft: 4 }}
        >
          App Preferences
        </AppText>
        <Box radius="xl" bg="surfaceContainerLowest" shadow style={{ overflow: 'hidden' }}>
          {/* Theme Switcher */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={() => {
              setIsThemeDropdownOpen(!isThemeDropdownOpen);
              setIsCurrencyDropdownOpen(false);
            }}
          >
            <Box 
              row 
              align="center" 
              justify="space-between" 
              px={16} 
              py={14}
              style={{ borderBottomWidth: 1, borderBottomColor: isDarkMode ? theme.colors.surfaceContainerHigh : theme.colors.outlineVariant }}
            >
              <Box row align="center" gap={12} style={{ flex: 1 }}>
                <Box width={38} height={38} radius="lg" bg={isDarkMode ? 'rgba(168, 85, 247, 0.15)' : '#f3e8ff'} align="center" justify="center">
                  <Icon name="palette" color="#a855f7" size={18} />
                </Box>
                <Box style={{ flex: 1 }}>
                  <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600', fontSize: 15 }}>Theme Mode</AppText>
                  <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 11, marginTop: 1 }}>Appearance styling</AppText>
                </Box>
              </Box>
              <Box row align="center" gap={6}>
                <Box px={10} py={4} radius="md" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'}>
                  <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 11 }}>
                    {themeMode === 'system' ? 'System' : (themeMode === 'dark' ? 'Dark' : 'Light')}
                  </AppText>
                </Box>
                <Box style={{ transform: [{ rotate: isThemeDropdownOpen ? '90deg' : '0deg' }] }}>
                  <Icon name="chevron-right" color={theme.colors.outline} size={16} />
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>

          {/* Theme Dropdown Options */}
          {isThemeDropdownOpen && (
            <Box 
              bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'} 
              px={16} 
              py={4}
              style={{ borderBottomWidth: 1, borderBottomColor: isDarkMode ? theme.colors.surfaceContainerHigh : theme.colors.outlineVariant }}
            >
              {themeOptions.map((opt) => {
                const isSelected = themeMode === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => {
                      setThemeMode(opt.value);
                      setIsThemeDropdownOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Box row align="center" justify="space-between" py={12} px={8}>
                      <AppText 
                        variant="bodyMd" 
                        color={isSelected ? 'primary' : 'onSurface'} 
                        style={{ fontWeight: isSelected ? '700' : '500', fontSize: 14 }}
                      >
                        {opt.label}
                      </AppText>
                      {isSelected && (
                        <AppText variant="labelXs" color="primary" style={{ fontWeight: '800' }}>
                          ✓
                        </AppText>
                      )}
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          )}

          {/* Currency Switcher */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={() => {
              setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
              setIsThemeDropdownOpen(false);
            }}
          >
            <Box row align="center" justify="space-between" px={16} py={14}>
              <Box row align="center" gap={12} style={{ flex: 1 }}>
                <Box width={38} height={38} radius="lg" bg={isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5'} align="center" justify="center">
                  <Icon name="budgets" color="#10b981" size={18} />
                </Box>
                <Box style={{ flex: 1 }}>
                  <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600', fontSize: 15 }}>Default Currency</AppText>
                  <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 11, marginTop: 1 }}>Formatting symbol & rates</AppText>
                </Box>
              </Box>
              <Box row align="center" gap={6}>
                <Box px={10} py={4} radius="md" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'}>
                  <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 11 }}>
                    {currencies[currency].symbol} {currencies[currency].code}
                  </AppText>
                </Box>
                <Box style={{ transform: [{ rotate: isCurrencyDropdownOpen ? '90deg' : '0deg' }] }}>
                  <Icon name="chevron-right" color={theme.colors.outline} size={16} />
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>

          {/* Currency Dropdown Options */}
          {isCurrencyDropdownOpen && (
            <Box 
              bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'} 
              px={16} 
              py={4}
            >
              {Object.values(currencies).map((curr) => {
                const isSelected = currency === curr.code;
                return (
                  <TouchableOpacity
                    key={curr.code}
                    onPress={() => {
                      setCurrency(curr.code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Box row align="center" justify="space-between" py={12} px={8}>
                      <AppText 
                        variant="bodyMd" 
                        color={isSelected ? 'primary' : 'onSurface'} 
                        style={{ fontWeight: isSelected ? '700' : '500', fontSize: 14 }}
                      >
                        {curr.name} ({curr.symbol})
                      </AppText>
                      {isSelected && (
                        <AppText variant="labelXs" color="primary" style={{ fontWeight: '800' }}>
                          ✓
                        </AppText>
                      )}
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      {/* SECTION 3: DATA & STORAGE (DANGER ZONE) */}
      <Box mb={20}>
        <AppText 
          variant="labelXs" 
          color="error" 
          style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8, marginLeft: 4 }}
        >
          Data & Storage
        </AppText>
        <Box 
          radius="xl" 
          bg={isDarkMode ? 'surfaceContainerLowest' : 'surfaceContainerLowest'} 
          shadow 
          style={{ 
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)',
          }}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={handlePromptReset}>
            <Box row align="center" justify="space-between" px={16} py={14}>
              <Box row align="center" gap={12} style={{ flex: 1 }}>
                <Box width={38} height={38} radius="lg" bg={isDarkMode ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2'} align="center" justify="center">
                  <Icon name="close" color={theme.colors.error} size={18} />
                </Box>
                <Box style={{ flex: 1 }}>
                  <AppText variant="bodyMd" color="error" style={{ fontWeight: '700', fontSize: 15 }}>
                    Reset Application Data
                  </AppText>
                  <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 11, marginTop: 1 }}>
                    Clear transactions, budgets & limits
                  </AppText>
                </Box>
              </Box>
              <Box style={{ transform: [{ rotate: isConfirmingReset ? '90deg' : '0deg' }] }}>
                <Icon name="chevron-right" color={theme.colors.error} size={16} />
              </Box>
            </Box>
          </TouchableOpacity>

          {/* Inline Expandable Reset Confirmation */}
          {isConfirmingReset && (
            <Box 
              p={14} 
              mx={12}
              mb={14}
              radius="lg" 
              bg={isDarkMode ? 'rgba(239, 68, 68, 0.12)' : '#fef2f2'} 
              border={1}
              borderColor={theme.colors.error}
            >
              <AppText variant="bodyMd" color="error" style={{ fontWeight: '700', marginBottom: 4, fontSize: 14 }}>
                Confirm Reset All Data?
              </AppText>
              <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 12, lineHeight: 17, marginBottom: 14 }}>
                This action will erase all user expenses, transactions, total set budget, and category limits. This action cannot be undone.
              </AppText>
              <Box row justify="flex-end" gap={8}>
                <TouchableOpacity onPress={() => setIsConfirmingReset(false)}>
                  <Box px={14} py={7} radius="md" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'}>
                    <AppText variant="labelXs" color="onSurface" style={{ fontWeight: '700', fontSize: 12 }}>
                      Cancel
                    </AppText>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={executeReset}>
                  <Box px={14} py={7} radius="md" bg="error">
                    <AppText variant="labelXs" color="onError" style={{ fontWeight: '700', fontSize: 12 }}>
                      Confirm Reset
                    </AppText>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Log Out Button */}
      {isLoggedIn && (
        <TouchableOpacity 
          onPress={onLogout}
          activeOpacity={0.7} 
          style={{ alignSelf: 'center', marginBottom: 16 }}
        >
          <Box row align="center" gap={8} py={10} px={20} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'}>
            <Box style={{ transform: [{ rotate: '180deg' }] }}>
              <Icon name="chevron-right" color={theme.colors.error} size={16} />
            </Box>
            <AppText variant="bodyMd" color="error" style={{ fontWeight: '700', fontSize: 14 }}>
              Log Out of Account
            </AppText>
          </Box>
        </TouchableOpacity>
      )}

      {/* App Version Info Footer */}
      <Box align="center" mt={8} mb={28}>
        <Box px={12} py={4} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
          <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 11, fontWeight: '600' }}>
            DailySpend v1.0.0 • Expo v57
          </AppText>
        </Box>
      </Box>
    </Box>
  );
}
