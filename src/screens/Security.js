import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';
import AppScaffold from '@/components/AppScaffold';

export default function Security({ onBack }) {
  const { theme, isDarkMode } = useTheme();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Security settings updated successfully!');
    onBack();
  };

  const devices = [
    { id: '1', name: 'iPhone 14 Pro', detail: 'New York, USA • Active now', current: true },
    { id: '2', name: 'MacBook Pro 16"', detail: 'New York, USA • Oct 15, 10:24 AM', current: false },
  ];

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
          Security
        </AppText>
        <Box width={20} />
      </Box>

      {/* 2FA Card */}
      <Box mx="containerMargin" mt={8} mb={24} p="containerPadding" radius="xl" bg="surfaceContainerLowest" shadow>
        <Box row align="center" justify="space-between">
          <Box style={{ flex: 1, paddingRight: 16 }}>
            <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '700' }}>
              Two-Factor Authentication
            </AppText>
            <AppText variant="labelXs" color="onSurfaceVariant" style={{ marginTop: 4, lineHeight: 18 }}>
              Secure your account by requiring an additional verification code on login.
            </AppText>
          </Box>
          <Switch
            value={is2FAEnabled}
            onValueChange={setIs2FAEnabled}
            trackColor={{ false: theme.colors.surfaceContainer, true: theme.colors.primary }}
            thumbColor="#ffffff"
          />
        </Box>
      </Box>

      {/* Password Card */}
      <Box mx="containerMargin" mb={24} p="containerPadding" radius="xl" bg="surfaceContainerLowest" shadow>
        <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '800', marginBottom: 20 }}>
          Change Password
        </AppText>

        <Box gap={16} mb={24}>
          <Box px={16} py={12} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
            <TextInput
              placeholder="Current Password"
              placeholderTextColor={theme.colors.outline}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={{
                fontFamily: theme.typography.bodyMd.fontFamily,
                fontSize: theme.typography.bodyMd.fontSize,
                color: theme.colors.onSurface,
                padding: 0,
                margin: 0,
              }}
            />
          </Box>

          <Box px={16} py={12} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor={theme.colors.outline}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={{
                fontFamily: theme.typography.bodyMd.fontFamily,
                fontSize: theme.typography.bodyMd.fontSize,
                color: theme.colors.onSurface,
                padding: 0,
                margin: 0,
              }}
            />
          </Box>

          <Box px={16} py={12} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLow'}>
            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor={theme.colors.outline}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

        <TouchableOpacity onPress={handleUpdatePassword} activeOpacity={0.9}>
          <Box py={16} radius="full" bg="primary" align="center">
            <AppText variant="bodyMd" color="onPrimary" style={{ fontWeight: '700' }}>
              Update Password
            </AppText>
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Active Devices Card */}
      <Box mx="containerMargin" mb={32} p="containerPadding" radius="xl" bg="surfaceContainerLowest" shadow>
        <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '800', marginBottom: 16 }}>
          Active Devices
        </AppText>

        <Box gap={16}>
          {devices.map((device, index) => {
            const isLast = index === devices.length - 1;
            return (
              <Box 
                key={device.id} 
                row 
                align="center" 
                justify="space-between"
                pb={isLast ? 0 : 16}
                style={!isLast && { borderBottomWidth: 1, borderBottomColor: isDarkMode ? theme.colors.surfaceContainerHigh : theme.colors.outlineVariant }}
              >
                <Box row align="center" gap={12}>
                  <Box width={40} height={40} radius="full" bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'} align="center" justify="center">
                    <Icon name="lock" color={device.current ? theme.colors.primary : theme.colors.outline} size={18} />
                  </Box>
                  <Box>
                    <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '700' }}>
                      {device.name}
                    </AppText>
                    <AppText variant="labelXs" color="onSurfaceVariant" style={{ marginTop: 2 }}>
                      {device.detail}
                    </AppText>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </AppScaffold>
  );
}
