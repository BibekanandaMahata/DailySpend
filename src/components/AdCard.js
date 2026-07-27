import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';

export default function AdCard() {
  const { theme, isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box 
      p="containerPadding" 
      radius="lg" 
      bg={isDarkMode ? 'surfaceContainerLow' : 'primary'}
      shadow
      style={{
        overflow: 'hidden',
        borderWidth: isDarkMode ? 1.5 : 0,
        borderColor: isDarkMode ? theme.colors.outlineVariant : 'transparent',
      }}
    >
      {/* Background Graphic Abstract Shapes (Glassmorphism layout art) */}
      <Box 
        width={140} 
        height={140} 
        radius="full" 
        bg="rgba(255, 255, 255, 0.08)" 
        style={{
          position: 'absolute',
          right: -40,
          top: -40,
        }}
      />
      <Box 
        width={80} 
        height={80} 
        radius="full" 
        bg="rgba(255, 255, 255, 0.05)" 
        style={{
          position: 'absolute',
          right: 30,
          bottom: -30,
        }}
      />

      {/* Dismiss Button */}
      <TouchableOpacity 
        onPress={() => setIsVisible(false)} 
        activeOpacity={0.7}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          padding: 4,
        }}
      >
        <Icon name="close" color={isDarkMode ? theme.colors.onSurfaceVariant : 'rgba(255, 255, 255, 0.6)'} size={16} />
      </TouchableOpacity>

      {/* Card Content */}
      <Box style={{ paddingRight: 24 }}>
        {/* Rebranding Pill Badge */}
        <Box 
          alignSelf="flex-start" 
          px={12} 
          py={4} 
          mb={12} 
          radius="md" 
          bg={isDarkMode ? 'rgba(173, 198, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)'}
        >
          <AppText 
            variant="labelXs" 
            color={isDarkMode ? 'primary' : 'white'} 
            style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}
          >
            DailySpend Obsidian
          </AppText>
        </Box>

        {/* Ad Title */}
        <AppText 
          variant="headlineLg" 
          color={isDarkMode ? 'onSurface' : 'white'} 
          style={{ fontWeight: '800', lineHeight: 28, marginBottom: 8 }}
        >
          Get 2.0% Cash Back on All Swipes
        </AppText>

        {/* Ad Subtitle / Pitch */}
        <AppText 
          variant="bodyMd" 
          color={isDarkMode ? 'onSurfaceVariant' : 'rgba(255, 255, 255, 0.85)'} 
          style={{ marginBottom: 20, fontSize: 14, lineHeight: 20 }}
        >
          No annual fees. Instant pre-approval. Spend smart and earn on every transaction.
        </AppText>

        {/* CTA Button */}
        <TouchableOpacity activeOpacity={0.9} style={{ alignSelf: 'flex-start' }}>
          <Box 
            px={20} 
            py={12} 
            radius="md" 
            bg={isDarkMode ? 'primary' : 'white'}
            shadow
          >
            <AppText 
              variant="labelSm" 
              color={isDarkMode ? 'onPrimary' : 'primary'} 
              style={{ fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 }}
            >
              Apply Now
            </AppText>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
