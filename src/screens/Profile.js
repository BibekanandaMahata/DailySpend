import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';
import AppScaffold from '@/components/AppScaffold';

export default function Profile({ onBack }) {
  const { theme, isDarkMode } = useTheme();
  
  const [name, setName] = useState('DailySpend User');
  const [email, setEmail] = useState('user@dailyspend.app');
  const [phone, setPhone] = useState('+1 (555) 019-2834');

  const handleSave = () => {
    alert('Profile updated successfully!');
    onBack();
  };

  return (
    <AppScaffold scrollable={true}>
      {/* Header Bar */}
      <Box row align="center" justify="space-between" px="containerMargin" py={16} bg={theme.colors.background}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
          <Box row align="center" gap={4}>
            <Box style={{ transform: [{ rotate: '180deg' }] }}>
              <Icon name="chevron-right" color={theme.colors.primary} size={20} />
            </Box>
          </Box>
        </TouchableOpacity>
        <AppText variant="headlineLg" color="onSurface" style={{ fontWeight: '800' }}>
          Edit Profile
        </AppText>
        <Box width={20} />
      </Box>

      {/* Avatar Display */}
      <Box align="center" my={24}>
        <Box width={96} height={96} radius="full" bg="primaryContainer" justify="center" align="center" mb={12} shadow>
          <AppText variant="displayLg" color="onPrimaryContainer" style={{ fontWeight: '700' }}>DS</AppText>
        </Box>
        <TouchableOpacity activeOpacity={0.7}>
          <AppText variant="bodyMd" color="primary" style={{ fontWeight: '700' }}>
            Change Photo
          </AppText>
        </TouchableOpacity>
      </Box>

      {/* Profile Form Card */}
      <Box mx="containerMargin" mb={24} p="containerPadding" radius="xl" bg="surfaceContainerLowest" shadow>
        <Box gap={24} mb={32}>
          {/* Full Name */}
          <Box>
            <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8 }}>
              Full Name
            </AppText>
            <Box px={16} py={12} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
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
          </Box>

          {/* Email Address */}
          <Box>
            <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8 }}>
              Email Address
            </AppText>
            <Box px={16} py={12} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
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
          </Box>

          {/* Phone Number */}
          <Box>
            <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8 }}>
              Phone Number
            </AppText>
            <Box px={16} py={12} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={theme.colors.outline}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
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
        </Box>

        {/* Save button */}
        <TouchableOpacity onPress={handleSave} activeOpacity={0.9}>
          <Box py={16} radius="full" bg="primary" align="center">
            <AppText variant="bodyMd" color="onPrimary" style={{ fontWeight: '700' }}>
              Save Changes
            </AppText>
          </Box>
        </TouchableOpacity>
      </Box>
    </AppScaffold>
  );
}
