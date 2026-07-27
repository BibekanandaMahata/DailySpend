import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';
import AppScaffold from '@/components/AppScaffold';
import Sidebar from '@/components/Sidebar';

export default function Auth({ onLoginSuccess, onBack, isDrawerOpen = false, setIsDrawerOpen }) {
  const { theme, isDarkMode } = useTheme();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (mode === 'login') {
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
    } else {
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
    }
    // Mock success
    onLoginSuccess();
  };

  const isLogin = mode === 'login';

  return (
    <Box px="containerMargin" py={16}>
      {/* Main card */}
      <Box p="containerPadding" radius="xl" bg="surfaceContainerLowest" shadow>
        {/* Logo and Header */}
        <Box align="center" mt={16} mb={28}>
          <Box row align="center" gap={8} mb={16}>
            <Box width={32} height={32} border={3} borderColor="primary" radius={8} justify="center" align="center">
              <Box width={12} height={12} bg="primary" radius={3} />
            </Box>
            <AppText variant="headlineLg" color="onSurface" style={{ fontWeight: '800', letterSpacing: -0.5 }}>
              DailySpend
            </AppText>
          </Box>
          <AppText variant="headlineLg" color="onSurface" style={{ fontWeight: '800', marginBottom: 8 }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ textAlign: 'center' }}>
            {isLogin ? 'Enter your details to access your account.' : 'Start your journey to financial clarity.'}
          </AppText>
        </Box>

        {/* Form fields */}
        <Box gap={24} mb={24}>
          {!isLogin && (
            <Box style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, pb: 8 }}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={theme.colors.outline}
                value={name}
                onChangeText={setName}
                style={{
                  fontFamily: theme.typography.bodyMd.fontFamily,
                  fontSize: theme.typography.bodyMd.fontSize,
                  color: theme.colors.onSurface,
                  padding: 0,
                  margin: 0,
                }}
              />
            </Box>
          )}

          <Box style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, pb: 8 }}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={theme.colors.outline}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={{
                fontFamily: theme.typography.bodyMd.fontFamily,
                fontSize: theme.typography.bodyMd.fontSize,
                color: theme.colors.onSurface,
                padding: 0,
                margin: 0,
              }}
            />
          </Box>

          <Box style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, pb: 8 }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.outline}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              style={{
                fontFamily: theme.typography.bodyMd.fontFamily,
                fontSize: theme.typography.bodyMd.fontSize,
                color: theme.colors.onSurface,
                padding: 0,
                margin: 0,
              }}
            />
          </Box>
        </Box>

        {isLogin && (
          <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
            <AppText variant="labelSm" color="primary" style={{ fontWeight: '600' }}>
              Forgot Password?
            </AppText>
          </TouchableOpacity>
        )}

        {/* Submit button */}
        <TouchableOpacity onPress={handleAuth} activeOpacity={0.9} style={{ marginBottom: 24 }}>
          <Box
            py={16}
            radius="full"
            bg="primary"
            row
            align="center"
            justify="center"
            gap={8}
          >
            <AppText variant="bodyMd" color="onPrimary" style={{ fontWeight: '600' }}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </AppText>
            <Icon name="chevron-right" color="#ffffff" size={16} />
          </Box>
        </TouchableOpacity>

        {/* Divider */}
        <Box row align="center" gap={12} mb={24}>
          <Box flex={1} height={1} bg={isDarkMode ? 'surfaceContainerHigh' : 'outlineVariant'} />
          <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            or continue with
          </AppText>
          <Box flex={1} height={1} bg={isDarkMode ? 'surfaceContainerHigh' : 'outlineVariant'} />
        </Box>

        {/* Social logins */}
        <Box gap={12} mb={16}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleAuth}>
            <Box
              py={14}
              radius="xl"
              border={1}
              borderColor={isDarkMode ? 'surfaceContainerHigh' : 'outlineVariant'}
              bg="transparent"
              row
              align="center"
              justify="center"
              gap={8}
            >
              <Icon name="chevron-right" color={theme.colors.onSurface} size={16} />
              <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600' }}>
                Google
              </AppText>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={handleAuth}>
            <Box
              py={14}
              radius="xl"
              border={1}
              borderColor={isDarkMode ? 'surfaceContainerHigh' : 'outlineVariant'}
              bg="transparent"
              row
              align="center"
              justify="center"
              gap={8}
            >
              <Icon name="lock" color={theme.colors.onSurface} size={16} />
              <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600' }}>
                Apple
              </AppText>
            </Box>
          </TouchableOpacity>
        </Box>

        {/* Toggle Mode */}
        <Box row align="center" justify="center" mt={8} mb={16}>
          <AppText variant="bodyMd" color="onSurfaceVariant">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </AppText>
          <TouchableOpacity onPress={() => setMode(isLogin ? 'signup' : 'login')} activeOpacity={0.7}>
            <AppText variant="bodyMd" color="primary" style={{ fontWeight: '700' }}>
              {isLogin ? 'Create an account' : 'Log in'}
            </AppText>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
